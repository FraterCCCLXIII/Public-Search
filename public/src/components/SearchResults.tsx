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
  Button,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  useTheme as useMuiTheme
} from '@mui/material';
import { useTheme } from '../theme/ThemeContext';
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resultsPerPage, setResultsPerPage] = useState<number>(10);
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: 'any',
    fileType: 'any',
    domain: 'any',
    language: 'any'
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { themeType } = useTheme();
  const muiTheme = useMuiTheme();

  // Calculate pagination
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedResults = results.slice(startIndex, endIndex);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  // Function to fetch results based on search type
  const fetchResults = async (page = 1) => {
    if (!query) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Determine the API endpoint based on search type
      let endpoint = 'http://localhost:8090/yacysearch.json';
      let params: any = {
        query,
        startRecord: ((page - 1) * resultsPerPage) + 1,
        maximumRecords: resultsPerPage,
        resource: 'local',
        verify: false
      };
      
      // Add specific parameters based on search type
      if (searchType === 'image') {
        params.contentdom = 'image';
      } else if (searchType === 'video') {
        params.contentdom = 'video';
      } else if (searchType === 'file') {
        params.contentdom = 'app';
      } else if (searchType === 'news') {
        params.contentdom = 'text';
        params.constraint = '/date/';
      } else if (searchType === 'map') {
        params.contentdom = 'location';
      } else {
        // Default web search
        params.contentdom = 'text';
      }
      
      // Add sort parameter if not default
      if (currentSort !== 'relevance') {
        params.sort = currentSort === 'date' ? 'last_modified' : 'size';
      }
      
      const response = await axios.get(endpoint, { params });
      
      if (response.data && response.data.channels && response.data.channels[0]) {
        const channel = response.data.channels[0];
        setResults(channel.items || []);
        
        // Set total results count from the response
        if (channel.totalResults) {
          setTotalResults(parseInt(channel.totalResults));
        } else {
          setTotalResults(channel.items ? channel.items.length : 0);
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

  // Fetch results when query, searchType, currentSort, or page changes
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search parameters change
    fetchResults(1);
  }, [query, searchType, currentSort]);
  
  // Handle page change without resetting to page 1
  useEffect(() => {
    if (currentPage > 1) {
      fetchResults(currentPage);
    }
  }, [currentPage]);

  if (!query) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body1">Please enter a search query</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, px: 2, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Results for "{query}"
      </Typography>

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
          No results found for "{query}"
        </Typography>
      )}

      {/* Results count and controls */}
      {!loading && !error && results.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {startIndex + 1}-{Math.min(endIndex, results.length)} of {totalResults.toLocaleString()} results
          </Typography>
          <Box>
            <Button 
              size="small" 
              startIcon={<SortIcon />}
              onClick={(e) => setSortAnchorEl(e.currentTarget)}
              sx={{ 
                mr: 1, 
                textTransform: 'none',
                borderRadius: 24,
              }}
            >
              Sort
            </Button>
            <Button 
              size="small" 
              startIcon={<FilterListIcon />}
              onClick={(e) => setFilterAnchorEl(e.currentTarget)}
              sx={{ 
                textTransform: 'none',
                borderRadius: 24,
              }}
            >
              Filter
            </Button>
          </Box>
        </Box>
      )}

      {/* Sort Menu */}
      <Menu
        anchorEl={sortAnchorEl}
        open={Boolean(sortAnchorEl)}
        onClose={() => setSortAnchorEl(null)}
      >
        <MenuItem 
          onClick={() => {
            setCurrentSort('relevance');
            setSortAnchorEl(null);
          }}
          selected={currentSort === 'relevance'}
        >
          Relevance
        </MenuItem>
        <MenuItem 
          onClick={() => {
            setCurrentSort('date');
            setSortAnchorEl(null);
          }}
          selected={currentSort === 'date'}
        >
          Date
        </MenuItem>
        <MenuItem 
          onClick={() => {
            setCurrentSort('size');
            setSortAnchorEl(null);
          }}
          selected={currentSort === 'size'}
        >
          Size
        </MenuItem>
      </Menu>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={() => setFilterAnchorEl(null)}
        PaperProps={{
          sx: { width: 250 }
        }}
      >
        <MenuItem sx={{ justifyContent: 'center' }}>
          <Typography variant="subtitle2">Filter Results</Typography>
        </MenuItem>
        <Divider />
        <Box sx={{ p: 2 }}>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Date</InputLabel>
            <Select
              value={filters.dateRange}
              label="Date"
              onChange={(e: SelectChangeEvent) => 
                setFilters({...filters, dateRange: e.target.value})
              }
            >
              <MenuItem value="any">Any time</MenuItem>
              <MenuItem value="day">Past 24 hours</MenuItem>
              <MenuItem value="week">Past week</MenuItem>
              <MenuItem value="month">Past month</MenuItem>
              <MenuItem value="year">Past year</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>File Type</InputLabel>
            <Select
              value={filters.fileType}
              label="File Type"
              onChange={(e: SelectChangeEvent) => 
                setFilters({...filters, fileType: e.target.value})
              }
            >
              <MenuItem value="any">Any format</MenuItem>
              <MenuItem value="pdf">PDF</MenuItem>
              <MenuItem value="doc">Word</MenuItem>
              <MenuItem value="ppt">PowerPoint</MenuItem>
              <MenuItem value="xls">Excel</MenuItem>
              <MenuItem value="txt">Text</MenuItem>
            </Select>
          </FormControl>
          
          <Button 
            fullWidth 
            variant="contained" 
            onClick={() => setFilterAnchorEl(null)}
            sx={{ 
              mt: 1,
              textTransform: 'none',
              borderRadius: 24,
            }}
          >
            Apply Filters
          </Button>
        </Box>
      </Menu>

      {/* Display search results */}
      {searchType === 'image' ? (
        // Image grid layout for image search
        <Grid container spacing={2}>
          {paginatedResults.map((result, index) => {
            const imageResult = result as ImageSearchResult;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card 
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    '&:hover': {
                      boxShadow: 2,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={imageResult.image || imageResult.link}
                    alt={imageResult.title}
                    sx={{
                      height: 160,
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
                    <Typography 
                      variant="body2" 
                      component={Link}
                      href={imageResult.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="primary"
                      sx={{ 
                        fontWeight: 'medium',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {imageResult.title || 'Untitled Image'}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{
                        display: 'block',
                        mt: 0.5,
                        fontSize: '0.7rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {imageResult.host || new URL(imageResult.link).hostname}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {imageResult.width && imageResult.height ? 
                          `${imageResult.width}×${imageResult.height}` : ''}
                      </Typography>
                      <Box>
                        <IconButton size="small" sx={{ p: 0.5, color: themeType === 'dark' ? 'white' : 'inherit' }}>
                          <BookmarkBorderIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        // Standard list layout for other search types
        paginatedResults.map((result, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                bgcolor: themeType === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ flex: 1 }}>
                <Link
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="primary"
                  sx={{ fontWeight: 'medium', fontSize: '1.1rem', display: 'block', mb: 0.5 }}
                >
                  {result.title || result.link}
                </Link>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: '0.8rem', mb: 1 }}
                >
                  {result.link}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {result.description || 'No description available'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', ml: 1 }}>
                <Tooltip title="Bookmark">
                  <IconButton 
                    size="small"
                    sx={{ color: themeType === 'dark' ? 'white' : 'inherit' }}
                    onClick={() => {
                      const id = result.id || result.link;
                      const newBookmarked = new Set(bookmarkedItems);
                      if (bookmarkedItems.has(id)) {
                        newBookmarked.delete(id);
                        setSnackbarMessage('Bookmark removed');
                      } else {
                        newBookmarked.add(id);
                        setSnackbarMessage('Bookmark added');
                      }
                      setBookmarkedItems(newBookmarked);
                      setSnackbarOpen(true);
                    }}
                  >
                    {bookmarkedItems.has(result.id || result.link) ? 
                      <BookmarkIcon fontSize="small" color="primary" /> : 
                      <BookmarkBorderIcon fontSize="small" />
                    }
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Blacklist">
                  <IconButton 
                    size="small"
                    sx={{ color: themeType === 'dark' ? 'white' : 'inherit' }}
                    onClick={() => {
                      const id = result.id || result.link;
                      const newBlacklisted = new Set(blacklistedItems);
                      if (blacklistedItems.has(id)) {
                        newBlacklisted.delete(id);
                        setSnackbarMessage('Removed from blacklist');
                      } else {
                        newBlacklisted.add(id);
                        setSnackbarMessage('Added to blacklist');
                      }
                      setBlacklistedItems(newBlacklisted);
                      setSnackbarOpen(true);
                    }}
                  >
                    <ThumbDownIcon 
                      fontSize="small" 
                      color={blacklistedItems.has(result.id || result.link) ? "error" : (themeType === 'dark' ? "white" : "inherit")} 
                    />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Recommend">
                  <IconButton size="small" sx={{ color: themeType === 'dark' ? 'white' : 'inherit' }}>
                    <ThumbUpIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Delete">
                  <IconButton size="small" sx={{ color: themeType === 'dark' ? 'white' : 'inherit' }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Paper>
        ))
      )}
      
      {/* Pagination controls */}
      {!loading && !error && totalResults > resultsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            sx={{ minWidth: 'auto', mx: 0.5 }}
          >
            &laquo;
          </Button>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            sx={{ minWidth: 'auto', mx: 0.5 }}
          >
            &lsaquo;
          </Button>
          
          {/* Page numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Show pages around current page
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? 'contained' : 'text'}
                onClick={() => setCurrentPage(pageNum)}
                sx={{ 
                  minWidth: '36px', 
                  mx: 0.5,
                  borderRadius: '50%',
                  height: '36px',
                  padding: 0
                }}
              >
                {pageNum}
              </Button>
            );
          })}
          
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            sx={{ minWidth: 'auto', mx: 0.5 }}
          >
            &rsaquo;
          </Button>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            sx={{ minWidth: 'auto', mx: 0.5 }}
          >
            &raquo;
          </Button>
        </Box>
      )}

      {/* Notification Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default SearchResults;