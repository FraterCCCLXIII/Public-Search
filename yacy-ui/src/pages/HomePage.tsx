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
          Public
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          A Private Search Engine for the Free Web
        </Typography>
        <SearchForm />
        
        <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
          <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
            What is Public?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, maxWidth: '800px', mx: 'auto' }}>
            Public is a decentralized search engine that respects your privacy. Unlike traditional search engines,
            Public doesn't track your searches or build a profile about you. Your data remains yours.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap', mt: 4 }}>
            <Box sx={{ textAlign: 'center', maxWidth: '250px' }}>
              <Typography variant="h6" component="h4" sx={{ mb: 1 }}>
                <span className="material-symbols-outlined" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>
                  privacy_tip
                </span>
                Privacy-Focused
              </Typography>
              <Typography variant="body2">
                No tracking, no ads, no profiling. Just pure, private search results.
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', maxWidth: '250px' }}>
              <Typography variant="h6" component="h4" sx={{ mb: 1 }}>
                <span className="material-symbols-outlined" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>
                  public
                </span>
                Decentralized
              </Typography>
              <Typography variant="body2">
                Built on a network of independent nodes, making censorship nearly impossible.
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', maxWidth: '250px' }}>
              <Typography variant="h6" component="h4" sx={{ mb: 1 }}>
                <span className="material-symbols-outlined" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>
                  code
                </span>
                Open Source
              </Typography>
              <Typography variant="body2">
                Fully transparent code that anyone can inspect, modify, and contribute to.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;