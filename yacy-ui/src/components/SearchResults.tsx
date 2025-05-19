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
  Chip
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
  InsertDriveFile as GenericFileIcon
} from '@mui/icons-material';

interface WebSearchResult {
  title: string;
  link: string;
  description: string;
}

interface ImageSearchResult {
  title: string;
  link: string;
  image: string;
  width?: number;
  height?: number;
  size?: string;
}

interface FileSearchResult {
  title: string;
  link: string;
  description: string;
  fileType: string;
  fileSize?: string;
  lastModified?: string;
}

type SearchResult = WebSearchResult | ImageSearchResult | FileSearchResult;

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const searchType = searchParams.get('type') || 'web';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Adjust parameters based on search type
        const params: Record<string, string | number> = {
          query,
          maximumRecords: 20,
          resource: 'local'
        };

        // Add specific parameters based on search type
        if (searchType === 'image') {
          params.contentdom = 'image';
        } else if (searchType === 'file') {
          params.contentdom = 'audio,video,app';
        }
        
        const response = await axios.get('http://localhost:8090/yacysearch.json', { params });
        
        if (response.data && response.data.channels && response.data.channels[0] && response.data.channels[0].items) {
          // Process results based on search type
          if (searchType === 'image') {
            // Transform to image results
            const imageResults = response.data.channels[0].items.map((item: any) => ({
              title: item.title || '',
              link: item.link || '',
              image: item.image || item.link,
              width: item.width,
              height: item.height,
              size: item.sizename
            }));
            setResults(imageResults);
          } else if (searchType === 'file') {
            // Transform to file results
            const fileResults = response.data.channels[0].items.map((item: any) => ({
              title: item.title || item.link.split('/').pop() || '',
              link: item.link || '',
              description: item.description || '',
              fileType: item.mimetype || getFileTypeFromUrl(item.link),
              fileSize: item.sizename || '',
              lastModified: item.pubDate || ''
            }));
            setResults(fileResults);
          } else {
            // Web results
            setResults(response.data.channels[0].items);
          }
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
  }, [query, searchType]);

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
    <Box sx={{ mt: 4, px: 2, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        {searchType.charAt(0).toUpperCase() + searchType.slice(1)} results for "{query}"
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
          No {searchType} results found for "{query}"
        </Typography>
      )}

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
                    '&:hover': { boxShadow: 6 }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={imgResult.image}
                    alt={imgResult.title}
                    sx={{ objectFit: 'cover' }}
                    onError={(e) => {
                      // Fallback for broken images
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/140x140?text=No+Image';
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 1 }}>
                    <Link
                      href={imgResult.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      color="primary"
                      sx={{ fontSize: '0.9rem' }}
                    >
                      {imgResult.title || 'Image'}
                    </Link>
                  </CardContent>
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
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ mr: 2, color: 'primary.main' }}>
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
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
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
            </Box>
            
            {fileResult.description && (
              <Typography variant="body2" color="text.primary">
                {fileResult.description}
              </Typography>
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
            }}
          >
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
              sx={{ fontSize: '0.8rem', mb: 1 }}
            >
              {webResult.link}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {webResult.description || 'No description available'}
            </Typography>
          </Paper>
        );
      })}
    </Box>
  );
};

export default SearchResults;