import React from 'react';
import { Box, Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const searchType = searchParams.get('type') || 'web';

  return (
    <>
      <Header 
        showSearchInHeader={true} 
        initialSearchQuery={query}
        initialSearchType={searchType}
      />
      <Container maxWidth="lg">
        <Box sx={{ py: 2 }}>
          <SearchResults 
            initialQuery={query}
            initialType={searchType}
          />
        </Box>
      </Container>
    </>
  );
};

export default SearchPage;