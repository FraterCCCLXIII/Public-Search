import React, { useState } from 'react';
import { Box, Typography, Container, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&type=web`);
    }
  };

  return (
    <>
      <Header showSearchInHeader={false} />
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
            Decentralized Search for the Free Web
          </Typography>
          
          <Box 
            component="form" 
            onSubmit={handleSearchSubmit}
            sx={{ 
              width: '100%', 
              maxWidth: 600,
              mb: 4
            }}
          >
            <TextField
              fullWidth
              placeholder="Search the web..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="inherit" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 24, // Full rounded search bar
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  '&.MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: 'transparent',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'transparent',
                    },
                  },
                }
              }}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
              sx={{ 
                borderRadius: 24,
                px: 4,
                py: 1,
                textTransform: 'none'
              }}
            >
              Search
            </Button>
          </Box>
          
          <Typography variant="body2" color="text.secondary">
            Privacy-focused, decentralized search powered by YaCy
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;