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

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get('http://localhost:8090/yacysearch.json', {
          params: {
            query,
            maximumRecords: 20,
            resource: 'local'
          }
        });
        
        if (response.data && response.data.channels && response.data.channels[0] && response.data.channels[0].items) {
          setResults(response.data.channels[0].items);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to fetch search results. Make sure YaCy is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

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
            Showing {results.length} results
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

      {results.map((result, index) => (
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
                    color={blacklistedItems.has(result.id || result.link) ? "error" : "inherit"} 
                  />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Recommend">
                <IconButton size="small">
                  <ThumbUpIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Delete">
                <IconButton size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Paper>
      ))}

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