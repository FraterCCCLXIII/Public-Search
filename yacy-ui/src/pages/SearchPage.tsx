import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import SearchResults from '../components/SearchResults';
import { useLocation } from 'react-router-dom';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('web');
  
  // Parse query parameters from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'web';
    
    setSearchQuery(query);
    setSearchType(type);
  }, [location.search]);
  
  return (
    <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
      <Box sx={{ py: 2 }}>
        <SearchResults initialQuery={searchQuery} initialType={searchType} />
      </Box>
    </Container>
  );
};

export default SearchPage;