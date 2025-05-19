import React from 'react';
import { Box, Container } from '@mui/material';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';

const SearchPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 2 }}>
        <SearchForm />
        <SearchResults />
      </Box>
    </Container>
  );
};

export default SearchPage;