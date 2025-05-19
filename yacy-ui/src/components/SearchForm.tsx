import React, { useState } from 'react';
import { 
  Paper, 
  InputBase, 
  IconButton, 
  Box, 
  ToggleButtonGroup, 
  ToggleButton, 
  Tooltip 
} from '@mui/material';
import { 
  Search as SearchIcon,
  Image as ImageIcon,
  InsertDriveFile as FileIcon,
  Public as WebIcon
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';

type SearchType = 'web' | 'image' | 'file';

const SearchForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialType = (searchParams.get('type') as SearchType) || 'web';
  
  const [query, setQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState<SearchType>(initialType);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}&type=${searchType}`);
    }
  };

  const handleSearchTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newType: SearchType | null,
  ) => {
    if (newType !== null) {
      setSearchType(newType);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 24, // Full rounded search bar
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={`Search ${searchType === 'web' ? 'the P2P Web' : searchType === 'image' ? 'for images' : 'for files'}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          inputProps={{ 'aria-label': 'search' }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <ToggleButtonGroup
          value={searchType}
          exclusive
          onChange={handleSearchTypeChange}
          aria-label="search type"
          size="small"
          sx={{ 
            '& .MuiToggleButtonGroup-grouped': {
              border: '1px solid',
              borderColor: 'divider',
              '&:not(:first-of-type)': {
                borderRadius: 24,
                ml: 1,
              },
              '&:first-of-type': {
                borderRadius: 24,
              },
              mx: 0.5,
              px: 1.5,
            }
          }}
        >
          <Tooltip title="Web Search">
            <ToggleButton value="web" aria-label="web search">
              <WebIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Image Search">
            <ToggleButton value="image" aria-label="image search">
              <ImageIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="File Search">
            <ToggleButton value="file" aria-label="file search">
              <FileIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

export default SearchForm;