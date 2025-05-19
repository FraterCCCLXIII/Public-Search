import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Link, 
  CircularProgress, 
  Alert, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
} from '@mui/material';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { 
  Description as DescriptionIcon,
  PictureAsPdf as PdfIcon,
  Code as CodeIcon,
  AudioFile as AudioIcon,
  VideoFile as VideoIcon,
  Archive as ArchiveIcon,
  InsertDriveFile as GenericFileIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

interface WebSearchResult {
  title: string;
  link: string;
  description: string;
  id?: string;
  pubDate?: string;
  size?: string;
  host?: string;
  isBookmarked?: boolean;
  isBlacklisted?: boolean;
}

interface ImageSearchResult {
  title: string;
  link: string;
  image: string;
  width?: number;
  height?: number;
  size?: string;
  id?: string;
  pubDate?: string;
  host?: string;
  isBookmarked?: boolean;
  isBlacklisted?: boolean;
}

interface FileSearchResult {
  title: string;
  link: string;
  description: string;
  fileType: string;
  fileSize?: string;
  lastModified?: string;
  id?: string;
  host?: string;
  isBookmarked?: boolean;
  isBlacklisted?: boolean;
}

type SearchResult = WebSearchResult | ImageSearchResult | FileSearchResult;

interface FilterOptions {
  dateRange: string;
  fileType: string;
  domain: string;
  language: string;
}

type SortOption = 'relevance' | 'date' | 'size';

interface SearchResultsProps {
  initialQuery?: string;
  initialType?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  initialQuery = '', 
  initialType = 'web' 
}) => {
  const [searchParams] = useSearchParams();
  const query = initialQuery || searchParams.get('q') || '';
  const searchType = initialType || searchParams.get('type') || 'web';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(new Set());
  const [blacklistedItems, setBlacklistedItems] = useState<Set<string>>(new Set());
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [currentSort, setCurrentSort] = useState<SortOption>('relevance');
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: 'any',
    fileType: 'any',
    domain: 'any',
    language: 'any'
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Load bookmarks and blacklists from localStorage on component mount
  useEffect(() => {
    const loadSavedItems = () => {
      const savedBookmarks = localStorage.getItem('bookmarkedItems');
      if (savedBookmarks) {
        setBookmarkedItems(new Set(JSON.parse(savedBookmarks)));
      }
      
      const savedBlacklists = localStorage.getItem('blacklistedItems');
      if (savedBlacklists) {
        setBlacklistedItems(new Set(JSON.parse(savedBlacklists)));
      }
    };
    
    loadSavedItems();
  }, []);

  // Handle filter menu
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  // Handle sort menu
  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortChange = (sortOption: SortOption) => {
    setCurrentSort(sortOption);
    setSortAnchorEl(null);
    
    // Apply sorting to results
    const sortedResults = [...results];
    if (sortOption === 'date') {
      sortedResults.sort((a, b) => {
        const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
        const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
        return dateB - dateA; // Newest first
      });
    } else if (sortOption === 'size') {
      sortedResults.sort((a, b) => {
        const sizeA = a.size ? parseInt(a.size.replace(/\D/g, '')) : 0;
        const sizeB = b.size ? parseInt(b.size.replace(/\D/g, '')) : 0;
        return sizeB - sizeA; // Largest first
      });
    }
    // For 'relevance', we use the original order from the API
    
    setResults(sortedResults);
    setSnackbarMessage(`Sorted by ${sortOption}`);
    setSnackbarOpen(true);
  };

  // Handle filter changes
  const handleFilterChange = (event: SelectChangeEvent, filterType: keyof FilterOptions) => {
    const newFilters = { ...filters, [filterType]: event.target.value };
    setFilters(newFilters);
    
    // In a real implementation, this would trigger a new search with the filters applied
    setSnackbarMessage(`Filter applied: ${filterType} = ${event.target.value}`);
    setSnackbarOpen(true);
  };

  // Handle bookmark toggle
  const toggleBookmark = (resultId: string) => {
    const newBookmarkedItems = new Set(bookmarkedItems);
    
    if (newBookmarkedItems.has(resultId)) {
      newBookmarkedItems.delete(resultId);
      setSnackbarMessage('Bookmark removed');
    } else {
      newBookmarkedItems.add(resultId);
      setSnackbarMessage('Bookmark added');
    }
    
    setBookmarkedItems(newBookmarkedItems);
    localStorage.setItem('bookmarkedItems', JSON.stringify([...newBookmarkedItems]));
    setSnackbarOpen(true);
    
    // Update the results to reflect the bookmark status
    const updatedResults = results.map(result => {
      if (result.id === resultId) {
        return { ...result, isBookmarked: !result.isBookmarked };
      }
      return result;
    });
    
    setResults(updatedResults);
  };

  // Handle blacklist toggle
  const toggleBlacklist = (resultId: string) => {
    const newBlacklistedItems = new Set(blacklistedItems);
    
    if (newBlacklistedItems.has(resultId)) {
      newBlacklistedItems.delete(resultId);
      setSnackbarMessage('Removed from blacklist');
    } else {
      newBlacklistedItems.add(resultId);
      setSnackbarMessage('Added to blacklist');
    }
    
    setBlacklistedItems(newBlacklistedItems);
    localStorage.setItem('blacklistedItems', JSON.stringify([...newBlacklistedItems]));
    setSnackbarOpen(true);
    
    // Update the results to reflect the blacklist status
    const updatedResults = results.map(result => {
      if (result.id === resultId) {
        return { ...result, isBlacklisted: !result.isBlacklisted };
      }
      return result;
    });
    
    setResults(updatedResults);
  };

  // Handle recommend/like
  const handleRecommend = (resultId: string) => {
    // In a real implementation, this would send a recommendation to the YaCy server
    setSnackbarMessage('Result recommended');
    setSnackbarOpen(true);
  };

  // Handle delete
  const handleDelete = (resultId: string) => {
    // In a real implementation, this would send a delete request to the YaCy server
    // For now, we'll just remove it from the local results
    const updatedResults = results.filter(result => result.id !== resultId);
    setResults(updatedResults);
    setSnackbarMessage('Result removed from list');
    setSnackbarOpen(true);
  };

  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Get the external search setting
        const allowExternalSearch = localStorage.getItem('allowExternalSearch') === 'true';
        
        // Adjust parameters based on search type and filters
        const params: Record<string, string | number> = {
          query,
          maximumRecords: 50,
          resource: allowExternalSearch ? 'global' : 'local',
          verify: allowExternalSearch ? 'true' : 'false',
          sort: currentSort === 'relevance' ? 'query_ranking' : 
                currentSort === 'date' ? 'date' : 'size'
        };

        // Add specific parameters based on search type
        if (searchType === 'image') {
          params.contentdom = 'image';
        } else if (searchType === 'file') {
          params.contentdom = 'audio,video,app';
        }
        
        // Add filter parameters if they're not set to 'any'
        if (filters.dateRange !== 'any') {
          params.daterange = filters.dateRange;
        }
        
        if (filters.fileType !== 'any') {
          params.filetype = filters.fileType;
        }
        
        if (filters.domain !== 'any') {
          params.site = filters.domain;
        }
        
        if (filters.language !== 'any') {
          params.language = filters.language;
        }
        
        const response = await axios.get('http://localhost:8090/yacysearch.json', { params });
        
        if (response.data && response.data.channels && response.data.channels[0]) {
          // Set total results count
          setTotalResults(response.data.channels[0].totalResults || 0);
          
          if (response.data.channels[0].items) {
            // Process results based on search type
            if (searchType === 'image') {
              // Transform to image results
              const imageResults = response.data.channels[0].items.map((item: any) => {
                // Generate a unique ID if one doesn't exist
                const id = item.guid || item.link || Math.random().toString(36).substring(2, 15);
                
                return {
                  id,
                  title: item.title || '',
                  link: item.link || '',
                  image: item.image || item.link,
                  width: item.width,
                  height: item.height,
                  size: item.sizename,
                  pubDate: item.pubDate,
                  host: new URL(item.link).hostname,
                  isBookmarked: bookmarkedItems.has(id),
                  isBlacklisted: blacklistedItems.has(id)
                };
              });
              setResults(imageResults);
            } else if (searchType === 'file') {
              // Transform to file results
              const fileResults = response.data.channels[0].items.map((item: any) => {
                // Generate a unique ID if one doesn't exist
                const id = item.guid || item.link || Math.random().toString(36).substring(2, 15);
                
                return {
                  id,
                  title: item.title || item.link.split('/').pop() || '',
                  link: item.link || '',
                  description: item.description || '',
                  fileType: item.mimetype || getFileTypeFromUrl(item.link),
                  fileSize: item.sizename || '',
                  lastModified: item.pubDate || '',
                  pubDate: item.pubDate,
                  host: new URL(item.link).hostname,
                  isBookmarked: bookmarkedItems.has(id),
                  isBlacklisted: blacklistedItems.has(id)
                };
              });
              setResults(fileResults);
            } else {
              // Web results
              const webResults = response.data.channels[0].items.map((item: any) => {
                // Generate a unique ID if one doesn't exist
                const id = item.guid || item.link || Math.random().toString(36).substring(2, 15);
                
                return {
                  ...item,
                  id,
                  host: item.link ? new URL(item.link).hostname : '',
                  isBookmarked: bookmarkedItems.has(id),
                  isBlacklisted: blacklistedItems.has(id)
                };
              });
              setResults(webResults);
            }
          } else {
            setResults([]);
          }
        } else {
          setResults([]);
          setTotalResults(0);
        }
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to fetch search results. Make sure YaCy is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, searchType, currentSort, filters]);

  // Helper function to determine file type from URL
  const getFileTypeFromUrl = (url: string): string => {
    const extension = url.split('.').pop()?.toLowerCase() || '';
    
    const mimeTypes: Record<string, string> = {
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ppt: 'application/vnd.ms-powerpoint',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      zip: 'application/zip',
      rar: 'application/x-rar-compressed',
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      mp4: 'video/mp4',
      avi: 'video/x-msvideo',
      mov: 'video/quicktime',
      txt: 'text/plain',
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
      json: 'application/json',
      xml: 'application/xml'
    };
    
    return mimeTypes[extension] || 'application/octet-stream';
  };

  // Helper function to get file icon based on MIME type
  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('text/')) return <DescriptionIcon />;
    if (mimeType === 'application/pdf') return <PdfIcon />;
    if (mimeType.includes('audio')) return <AudioIcon />;
    if (mimeType.includes('video')) return <VideoIcon />;
    if (mimeType.includes('zip') || mimeType.includes('compressed') || mimeType.includes('archive')) return <ArchiveIcon />;
    if (mimeType.includes('javascript') || mimeType.includes('json') || mimeType.includes('xml') || mimeType.includes('html')) return <CodeIcon />;
    return <GenericFileIcon />;
  };

  if (!query) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body1">Please enter a search query</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, px: 2, maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">
          {searchType.charAt(0).toUpperCase() + searchType.slice(1)} results for "{query}"
        </Typography>
        
        {!loading && !error && results.length > 0 && (
          <Typography variant="body2" color="text.secondary">
            {totalResults.toLocaleString()} results found
          </Typography>
        )}
      </Box>
      
      {/* Filter and Sort Controls */}
      {!loading && !error && results.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Tooltip title="Filter Results">
              <Button 
                startIcon={<FilterListIcon />} 
                onClick={handleFilterClick}
                variant="outlined"
                size="small"
                sx={{ mr: 1 }}
              >
                Filters
              </Button>
            </Tooltip>
            
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterClose}
              PaperProps={{
                elevation: 3,
                sx: { minWidth: 250, maxWidth: 350, borderRadius: 2 }
              }}
            >
              <MenuItem sx={{ justifyContent: 'center' }}>
                <Typography variant="subtitle1" fontWeight={600}>Filter Options</Typography>
              </MenuItem>
              <Divider />
              
              {/* Date Range Filter */}
              <MenuItem>
                <FormControl fullWidth size="small">
                  <InputLabel id="date-range-label">Date</InputLabel>
                  <Select
                    labelId="date-range-label"
                    value={filters.dateRange}
                    label="Date"
                    onChange={(e) => handleFilterChange(e, 'dateRange')}
                  >
                    <MenuItem value="any">Any time</MenuItem>
                    <MenuItem value="day">Past 24 hours</MenuItem>
                    <MenuItem value="week">Past week</MenuItem>
                    <MenuItem value="month">Past month</MenuItem>
                    <MenuItem value="year">Past year</MenuItem>
                  </Select>
                </FormControl>
              </MenuItem>
              
              {/* File Type Filter */}
              {searchType === 'file' && (
                <MenuItem>
                  <FormControl fullWidth size="small">
                    <InputLabel id="file-type-label">File Type</InputLabel>
                    <Select
                      labelId="file-type-label"
                      value={filters.fileType}
                      label="File Type"
                      onChange={(e) => handleFilterChange(e, 'fileType')}
                    >
                      <MenuItem value="any">All file types</MenuItem>
                      <MenuItem value="pdf">PDF</MenuItem>
                      <MenuItem value="doc">Word documents</MenuItem>
                      <MenuItem value="xls">Excel spreadsheets</MenuItem>
                      <MenuItem value="ppt">Presentations</MenuItem>
                      <MenuItem value="txt">Text files</MenuItem>
                    </Select>
                  </FormControl>
                </MenuItem>
              )}
              
              {/* Domain Filter */}
              <MenuItem>
                <FormControl fullWidth size="small">
                  <InputLabel id="domain-label">Domain</InputLabel>
                  <Select
                    labelId="domain-label"
                    value={filters.domain}
                    label="Domain"
                    onChange={(e) => handleFilterChange(e, 'domain')}
                  >
                    <MenuItem value="any">All domains</MenuItem>
                    {/* Dynamically generated from results */}
                    {Array.from(new Set(results.map(r => r.host))).map((domain) => (
                      <MenuItem key={domain} value={domain}>{domain}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MenuItem>
              
              {/* Language Filter */}
              <MenuItem>
                <FormControl fullWidth size="small">
                  <InputLabel id="language-label">Language</InputLabel>
                  <Select
                    labelId="language-label"
                    value={filters.language}
                    label="Language"
                    onChange={(e) => handleFilterChange(e, 'language')}
                  >
                    <MenuItem value="any">All languages</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="it">Italian</MenuItem>
                  </Select>
                </FormControl>
              </MenuItem>
            </Menu>
          </Box>
          
          <Box>
            <Tooltip title="Sort Results">
              <Button 
                startIcon={<SortIcon />} 
                onClick={handleSortClick}
                variant="outlined"
                size="small"
              >
                Sort: {currentSort.charAt(0).toUpperCase() + currentSort.slice(1)}
              </Button>
            </Tooltip>
            
            <Menu
              anchorEl={sortAnchorEl}
              open={Boolean(sortAnchorEl)}
              onClose={handleSortClose}
              PaperProps={{
                elevation: 3,
                sx: { minWidth: 180, borderRadius: 2 }
              }}
            >
              <MenuItem 
                onClick={() => handleSortChange('relevance')}
                selected={currentSort === 'relevance'}
              >
                By relevance
              </MenuItem>
              <MenuItem 
                onClick={() => handleSortChange('date')}
                selected={currentSort === 'date'}
              >
                By date (newest first)
              </MenuItem>
              <MenuItem 
                onClick={() => handleSortChange('size')}
                selected={currentSort === 'size'}
              >
                By size (largest first)
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && results.length === 0 && (
        <Typography variant="body1" sx={{ my: 4 }}>
          No {searchType} results found for "{query}"
        </Typography>
      )}
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />

      {/* Image Search Results */}
      {searchType === 'image' && (
        <Grid container spacing={2}>
          {results.map((result, index) => {
            const imgResult = result as ImageSearchResult;
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    '&:hover': { boxShadow: 6 },
                    position: 'relative',
                    opacity: imgResult.isBlacklisted ? 0.6 : 1
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={imgResult.image}
                    alt={imgResult.title}
                    sx={{ objectFit: 'cover' }}
                    onError={(e) => {
                      // Fallback for broken images
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/160x160?text=No+Image';
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 1, pb: 0 }}>
                    <Link
                      href={imgResult.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      color="primary"
                      sx={{ fontSize: '0.9rem', display: 'block', mb: 0.5 }}
                    >
                      {imgResult.title || 'Image'}
                    </Link>
                    
                    {imgResult.host && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.75rem' }}>
                        {imgResult.host}
                      </Typography>
                    )}
                  </CardContent>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 0.5 }}>
                    <Box>
                      <Tooltip title={imgResult.isBookmarked ? "Remove bookmark" : "Bookmark"}>
                        <IconButton 
                          size="small" 
                          onClick={() => toggleBookmark(imgResult.id || '')}
                          color={imgResult.isBookmarked ? "primary" : "default"}
                        >
                          {imgResult.isBookmarked ? <BookmarkIcon fontSize="small" /> : <BookmarkBorderIcon fontSize="small" />}
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Recommend">
                        <IconButton 
                          size="small"
                          onClick={() => handleRecommend(imgResult.id || '')}
                        >
                          <ThumbUpIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    
                    <Box>
                      <Tooltip title={imgResult.isBlacklisted ? "Remove from blacklist" : "Blacklist"}>
                        <IconButton 
                          size="small"
                          onClick={() => toggleBlacklist(imgResult.id || '')}
                          color={imgResult.isBlacklisted ? "error" : "default"}
                        >
                          <ThumbDownIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Remove from results">
                        <IconButton 
                          size="small"
                          onClick={() => handleDelete(imgResult.id || '')}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  
                  {imgResult.isBlacklisted && (
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        zIndex: 1
                      }}
                    >
                      <Chip 
                        label="Blacklisted" 
                        color="error" 
                        variant="outlined" 
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Box>
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* File Search Results */}
      {searchType === 'file' && results.map((result, index) => {
        const fileResult = result as FileSearchResult;
        return (
          <Paper
            key={index}
            elevation={1}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 2,
              '&:hover': {
                boxShadow: 3,
              },
              opacity: fileResult.isBlacklisted ? 0.6 : 1,
              position: 'relative'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
              <Box sx={{ mr: 2, color: 'primary.main', mt: 0.5 }}>
                {getFileIcon(fileResult.fileType)}
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Link
                  href={fileResult.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="primary"
                  sx={{ fontWeight: 'medium', fontSize: '1.1rem', display: 'block', mb: 0.5 }}
                >
                  {fileResult.title}
                </Link>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: '0.8rem' }}
                >
                  {fileResult.link}
                </Typography>
                
                {fileResult.host && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                    {fileResult.host}
                  </Typography>
                )}
              </Box>
              
              <Box sx={{ display: 'flex', ml: 1 }}>
                <Tooltip title={fileResult.isBookmarked ? "Remove bookmark" : "Bookmark"}>
                  <IconButton 
                    size="small" 
                    onClick={() => toggleBookmark(fileResult.id || '')}
                    color={fileResult.isBookmarked ? "primary" : "default"}
                  >
                    {fileResult.isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="More actions">
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, mb: 1, ml: 6 }}>
              {fileResult.fileType && (
                <Chip 
                  label={fileResult.fileType.split('/').pop()} 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                />
              )}
              {fileResult.fileSize && (
                <Chip 
                  label={fileResult.fileSize} 
                  size="small" 
                  color="secondary" 
                  variant="outlined"
                />
              )}
              {fileResult.lastModified && (
                <Chip 
                  label={new Date(fileResult.lastModified).toLocaleDateString()} 
                  size="small" 
                  variant="outlined"
                />
              )}
            </Box>
            
            {fileResult.description && (
              <Typography variant="body2" color="text.primary" sx={{ ml: 6 }}>
                {fileResult.description}
              </Typography>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Tooltip title="Recommend">
                <IconButton 
                  size="small"
                  onClick={() => handleRecommend(fileResult.id || '')}
                  sx={{ mr: 1 }}
                >
                  <ThumbUpIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title={fileResult.isBlacklisted ? "Remove from blacklist" : "Blacklist"}>
                <IconButton 
                  size="small"
                  onClick={() => toggleBlacklist(fileResult.id || '')}
                  color={fileResult.isBlacklisted ? "error" : "default"}
                  sx={{ mr: 1 }}
                >
                  <ThumbDownIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Remove from results">
                <IconButton 
                  size="small"
                  onClick={() => handleDelete(fileResult.id || '')}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            
            {fileResult.isBlacklisted && (
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: 0,
                  p: 1
                }}
              >
                <Chip 
                  label="Blacklisted" 
                  color="error" 
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>
            )}
          </Paper>
        );
      })}

      {/* Web Search Results */}
      {searchType === 'web' && results.map((result, index) => {
        const webResult = result as WebSearchResult;
        return (
          <Paper
            key={index}
            elevation={1}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 2,
              '&:hover': {
                boxShadow: 3,
              },
              opacity: webResult.isBlacklisted ? 0.6 : 1,
              position: 'relative'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Link
                  href={webResult.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="primary"
                  sx={{ fontWeight: 'medium', fontSize: '1.1rem', display: 'block', mb: 0.5 }}
                >
                  {webResult.title || webResult.link}
                </Link>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: '0.8rem', mb: 0.5 }}
                >
                  {webResult.link}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {webResult.host && (
                    <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                      {webResult.host}
                    </Typography>
                  )}
                  
                  {webResult.pubDate && (
                    <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                      {new Date(webResult.pubDate).toLocaleDateString()}
                    </Typography>
                  )}
                  
                  {webResult.size && (
                    <Typography variant="caption" color="text.secondary">
                      {webResult.size}
                    </Typography>
                  )}
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex' }}>
                <Tooltip title={webResult.isBookmarked ? "Remove bookmark" : "Bookmark"}>
                  <IconButton 
                    size="small" 
                    onClick={() => toggleBookmark(webResult.id || '')}
                    color={webResult.isBookmarked ? "primary" : "default"}
                  >
                    {webResult.isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="More actions">
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            
            <Typography variant="body2" color="text.primary" sx={{ mb: 1.5 }}>
              {webResult.description || 'No description available'}
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Tooltip title="Recommend">
                <IconButton 
                  size="small"
                  onClick={() => handleRecommend(webResult.id || '')}
                  sx={{ mr: 1 }}
                >
                  <ThumbUpIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title={webResult.isBlacklisted ? "Remove from blacklist" : "Blacklist"}>
                <IconButton 
                  size="small"
                  onClick={() => toggleBlacklist(webResult.id || '')}
                  color={webResult.isBlacklisted ? "error" : "default"}
                  sx={{ mr: 1 }}
                >
                  <ThumbDownIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Remove from results">
                <IconButton 
                  size="small"
                  onClick={() => handleDelete(webResult.id || '')}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            
            {webResult.isBlacklisted && (
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: 0,
                  p: 1
                }}
              >
                <Chip 
                  label="Blacklisted" 
                  color="error" 
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>
            )}
          </Paper>
        );
      })}
    </Box>
  );
};

export default SearchResults;