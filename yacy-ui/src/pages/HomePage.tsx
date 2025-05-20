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
                  height: theme => theme.spacing(4), // 32px (0.5rem × 8 = 4 spacing units)
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
                height: theme => theme.spacing(4), // Match search field height
                textTransform: 'none'
              }}
            >
              Search
            </Button>
          </Box>
          
          <Box sx={{ maxWidth: 600, mt: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              About Public
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Public is a privacy-focused, decentralized search engine built on peer-to-peer technology. 
              Unlike traditional search engines, Public doesn't track your searches or build a profile about you.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Our network of independent nodes works together to index the web, creating a search experience 
              that's resistant to censorship and control by any single entity.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Button 
                href="/about" 
                color="primary" 
                size="small"
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 'medium',
                  mt: 1
                }}
              >
                Learn more about Public
              </Button>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;