import React from 'react';
import { Container, Typography, Box, Button, Paper, Grid, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const AboutPage: React.FC = () => {
  // Define theme colors
  const themeColors = {
    primary: '#0066cc',    // Blue
    secondary: '#34c759',  // Green
    tertiary: '#ff9500'    // Orange
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About Public
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary" paragraph>
          A private, decentralized search engine for the free web
        </Typography>
      </Box>

      {/* Mission Section */}
      <Paper elevation={0} sx={{ p: 4, mb: 6, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          Public was created with a simple mission: to provide a search experience that respects your privacy while delivering relevant results. 
          In an era where data collection has become the norm, we believe in creating technology that serves users without compromising their privacy.
        </Typography>
        <Typography variant="body1" paragraph>
          We're building a decentralized network of search nodes that work together to index the web, making it resistant to censorship and control by any single entity.
          Public is and always will be open source, transparent, and community-driven.
        </Typography>
      </Paper>

      {/* How It Works Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          How Public Works
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: themeColors.primary, marginBottom: '1rem' }}>
                travel_explore
              </span>
              <Typography variant="h6" component="h3" gutterBottom>
                Decentralized Indexing
              </Typography>
              <Typography variant="body2">
                Our network of independent nodes crawls and indexes the web, sharing the workload and creating a robust, censorship-resistant index.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: themeColors.secondary, marginBottom: '1rem' }}>
                shield
              </span>
              <Typography variant="h6" component="h3" gutterBottom>
                Privacy Protection
              </Typography>
              <Typography variant="body2">
                Your searches are never logged, tracked, or used to build a profile. We don't serve targeted ads or sell your data to third parties.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: themeColors.tertiary, marginBottom: '1rem' }}>
                diversity_3
              </span>
              <Typography variant="h6" component="h3" gutterBottom>
                Community Powered
              </Typography>
              <Typography variant="body2">
                Public is built and maintained by a community of developers, privacy advocates, and users who believe in a better internet.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Create a Node Section */}
      <Paper elevation={0} sx={{ p: 4, mb: 6, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Create Your Own Node
        </Typography>
        <Typography variant="body1" paragraph>
          Contributing to the Public network is easy. By running your own node, you help expand our index and make the network more resilient.
        </Typography>
        <Box sx={{ my: 3 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Requirements:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>A server or computer with at least 4GB RAM</li>
            <li>At least 20GB of free disk space</li>
            <li>A stable internet connection</li>
            <li>Basic knowledge of command-line operations</li>
          </Typography>
        </Box>
        <Box sx={{ my: 3 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Quick Start:
          </Typography>
          <Box component="pre" sx={{ 
            p: 2, 
            bgcolor: 'grey.900', 
            color: 'common.white', 
            borderRadius: 1,
            overflowX: 'auto',
            fontSize: '0.875rem'
          }}>
            {`# Clone the repository
git clone https://github.com/FraterCCCLXIII/Public-Search.git
cd Public-Search

# Start the search server
docker-compose up -d`}
          </Box>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          component="a" 
          href="https://github.com/FraterCCCLXIII/Public-Search" 
          target="_blank"
          sx={{ mt: 2 }}
        >
          <span className="material-symbols-outlined" style={{ marginRight: '0.5rem' }}>
            book
          </span>
          Full Documentation
        </Button>
      </Paper>

      {/* Contribute Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Contribute to Public
        </Typography>
        <Typography variant="body1" paragraph>
          Public is an open-source project that thrives on community contributions. Whether you're a developer, designer, writer, or just passionate about privacy, there are many ways to help.
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}>
                  code
                </span>
                For Developers
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" paragraph>
                Help us improve the codebase, fix bugs, add features, or enhance performance. Our GitHub repository is open for pull requests.
              </Typography>
              <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
                <li>Fork the repository</li>
                <li>Create a feature branch</li>
                <li>Make your changes</li>
                <li>Submit a pull request</li>
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                component="a" 
                href="https://github.com/FraterCCCLXIII/Public-Search/issues" 
                target="_blank"
                sx={{ mt: 2 }}
                size="small"
              >
                View Open Issues
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}>
                  campaign
                </span>
                For Everyone
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" paragraph>
                Not a coder? You can still help! Spread the word about Public, report bugs, suggest features, or help with documentation.
              </Typography>
              <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
                <li>Star our GitHub repository</li>
                <li>Share Public with your network</li>
                <li>Report bugs or suggest features</li>
                <li>Help translate the interface</li>
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                component="a" 
                href="https://github.com/FraterCCCLXIII/Public-Search" 
                target="_blank"
                sx={{ mt: 2 }}
                size="small"
              >
                Visit GitHub
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Ready to experience a better search?
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={RouterLink} 
          to="/"
          size="large"
          sx={{ mt: 2 }}
        >
          <span className="material-symbols-outlined" style={{ marginRight: '0.5rem' }}>
            search
          </span>
          Start Searching
        </Button>
      </Box>
    </Container>
  );
};

export default AboutPage;