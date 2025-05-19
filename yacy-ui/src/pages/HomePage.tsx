import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import SearchForm from '../components/SearchForm';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 64px)',
          textAlign: 'center',
          py: 4,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          YaCy Search
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Decentralized Search for the Free Web
        </Typography>
        <SearchForm />
      </Box>
    </Container>
  );
};

export default HomePage;