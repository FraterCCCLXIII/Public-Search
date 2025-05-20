import React from 'react';
import { Container, Typography, Box, Button, Paper, Grid, Divider, useTheme as useMuiTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import Header from '../components/Header';

const AboutPage: React.FC = () => {
  const { themeType } = useTheme();
  const muiTheme = useMuiTheme();
  
  // Define theme colors based on current theme
  const themeColors = {
    primary: muiTheme.palette.primary.main,
    secondary: muiTheme.palette.secondary.main,
    tertiary: themeType === 'dark' ? '#ff9500' : '#ff9500'
  };

  return (
    <>
      <Header showSearchInHeader={false} />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            About Public
          </Typography>
          <Typography variant="h5" component="h2" color="text.secondary" paragraph>
            A private, decentralized search engine for the free web
          </Typography>
        </Box>
        
        {/* Three-column navigation section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 2,
              border: 1,
              borderColor: 'divider',
              textAlign: 'center'
            }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Mission & Values
              </Typography>
              <Typography variant="body2" paragraph>
                Learn about our commitment to privacy, decentralization, and an open web.
              </Typography>
              <Button 
                variant="outlined" 
                color="primary"
                sx={{ 
                  borderRadius: 24,
                  textTransform: 'none',
                  mt: 2
                }}
                onClick={() => {
                  const element = document.getElementById('mission-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 2,
              border: 1,
              borderColor: 'divider',
              textAlign: 'center'
            }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Technology
              </Typography>
              <Typography variant="body2" paragraph>
                Discover how our peer-to-peer search technology works and why it matters.
              </Typography>
              <Button 
                variant="outlined" 
                color="primary"
                sx={{ 
                  borderRadius: 24,
                  textTransform: 'none',
                  mt: 2
                }}
                onClick={() => {
                  const element = document.getElementById('technology-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 2,
              border: 1,
              borderColor: 'divider',
              textAlign: 'center'
            }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Get Involved
              </Typography>
              <Typography variant="body2" paragraph>
                Join our community and help build a better search experience for everyone.
              </Typography>
              <Button 
                variant="outlined" 
                color="primary"
                sx={{ 
                  borderRadius: 24,
                  textTransform: 'none',
                  mt: 2
                }}
                onClick={() => {
                  const element = document.getElementById('contribute-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Join Us
              </Button>
            </Paper>
          </Grid>
        </Grid>

      {/* Mission Section */}
      <Paper 
        id="mission-section"
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 6, 
          borderRadius: 2, 
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider'
        }}>
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
        <Typography variant="body1" paragraph>
          Built on the powerful YaCy peer-to-peer search technology, Public extends this foundation with a modern, user-friendly interface and enhanced features. YaCy's distributed architecture ensures that no single entity controls what you can search or find online.
        </Typography>
      </Paper>

      {/* P2P Technology Section */}
      <Paper 
        id="technology-section"
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 6, 
          borderRadius: 2, 
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider'
        }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Peer-to-Peer Search Technology
        </Typography>
        <Typography variant="body1" paragraph>
          Public is built on peer-to-peer (P2P) technology, which fundamentally changes how search works. Instead of relying on centralized servers controlled by a single company, P2P search distributes the workload across a network of volunteer nodes.
        </Typography>
        <Typography variant="body1" paragraph>
          This approach offers several key advantages:
        </Typography>
        <Box component="ul" sx={{ pl: 4 }}>
          <Typography component="li" variant="body1">
            <strong>Privacy by design:</strong> Your searches aren't tracked by a central authority
          </Typography>
          <Typography component="li" variant="body1">
            <strong>Censorship resistance:</strong> No single point of failure or control
          </Typography>
          <Typography component="li" variant="body1">
            <strong>Community governance:</strong> The network evolves based on user participation, not corporate interests
          </Typography>
          <Typography component="li" variant="body1">
            <strong>Resource sharing:</strong> Computing power and bandwidth are contributed voluntarily by the community
          </Typography>
        </Box>
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
                Our network of independent nodes crawls and indexes the web, sharing the workload and creating a robust, censorship-resistant index. Unlike centralized search engines, no single entity controls what gets indexed or how results are ranked.
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
      <Paper elevation={0} sx={{ 
        p: 4, 
        mb: 6, 
        borderRadius: 2, 
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider'
      }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Create Your Own Node
        </Typography>
        <Typography variant="body1" paragraph>
          Contributing to the Public network is easy. By running your own node, you help expand our index and make the network more resilient. Each node you operate adds to the collective intelligence of the network and increases the diversity of search results available to all users.
        </Typography>
        <Typography variant="body1" paragraph>
          When you run a node, you can customize what content it crawls and indexes, allowing you to contribute specialized knowledge in areas you care about. Your node communicates with other nodes in the network using a peer-to-peer protocol, sharing index information without centralized coordination.
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
            bgcolor: themeType === 'dark' ? 'grey.900' : 'grey.100', 
            color: themeType === 'dark' ? 'common.white' : 'common.black', 
            borderRadius: 2,
            overflowX: 'auto',
            fontSize: '0.875rem',
            border: 1,
            borderColor: 'divider'
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
          sx={{ 
            mt: 2,
            borderRadius: 24,
            textTransform: 'none'
          }}
        >
          <span className="material-symbols-outlined" style={{ marginRight: '0.5rem' }}>
            book
          </span>
          Full Documentation
        </Button>
      </Paper>

      {/* Contribute Section */}
      <Box id="contribute-section" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Contribute to Public
        </Typography>
        <Typography variant="body1" paragraph>
          Public is an open-source project that thrives on community contributions. Whether you're a developer, designer, writer, or just passionate about privacy, there are many ways to help.
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 2,
              border: 1,
              borderColor: 'divider'
            }}>
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
                sx={{ 
                  mt: 2,
                  borderRadius: 24,
                  textTransform: 'none',
                  borderColor: 'divider',
                  color: 'text.primary'
                }}
                size="small"
              >
                View Open Issues
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 2,
              border: 1,
              borderColor: 'divider'
            }}>
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
                sx={{ 
                  mt: 2,
                  borderRadius: 24,
                  textTransform: 'none',
                  borderColor: 'divider',
                  color: 'text.primary'
                }}
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
          sx={{ 
            mt: 2,
            borderRadius: 24,
            textTransform: 'none',
            px: 4,
            py: 1
          }}
        >
          <span className="material-symbols-outlined" style={{ marginRight: '0.5rem' }}>
            search
          </span>
          Start Searching
        </Button>
      </Box>
    </Container>
  </>
  );
};

export default AboutPage;