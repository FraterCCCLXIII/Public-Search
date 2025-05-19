import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Link, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

interface SearchResult {
  title: string;
  link: string;
  description: string;
}

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      {results.map((result, index) => (
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
        </Paper>
      ))}
    </Box>
  );
};

export default SearchResults;