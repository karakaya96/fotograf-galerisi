// src/App.js
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import CategoryPage from './CategoryPage';
import PhotoDetail from './PhotoDetail';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Box, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import theme from './theme';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categories = [
    { text: 'Doğa', path: 'nature' },
    { text: 'Teknoloji', path: 'technology' },
    { text: 'Seyahat', path: 'travel' },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/category/${searchTerm.trim()}`);
      setSearchTerm('');
      setMobileOpen(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="sticky" elevation={0} sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component={Link} to="/" variant="h5" sx={{ color: 'white', textDecoration: 'none', fontWeight: 700 }}>
            Fotoğraf Galerisi
          </Typography>

          {/* Desktop Menü */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {categories.map(cat => (
              <Button key={cat.text} color="inherit" component={Link} to={`/category/${cat.path}`}>
                {cat.text}
              </Button>
            ))}

            <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', ml: 2 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" sx={{ ml: 1 }}>Ara</Button>
            </Box>
          </Box>

          {/* Mobile Menü Butonu */}
          <IconButton color="inherit" edge="end" onClick={handleDrawerToggle} sx={{ display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: 280, backgroundColor: '#f8fafc', boxShadow: '0 12px 24px rgba(0,0,0,0.15)', borderRadius: '0 16px 16px 0' } }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
          <List>
            {categories.map(cat => (
              <ListItem key={cat.text} disablePadding>
                <ListItemButton component={Link} to={`/category/${cat.path}`} onClick={() => setMobileOpen(false)}>
                  <ListItemText primary={cat.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField variant="outlined" size="small" placeholder="Ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Button type="submit" variant="contained" fullWidth>Ara</Button>
          </Box>
        </Box>
      </Drawer>

      {/* Sayfa İçeriği */}
      <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: 'background.default', minHeight: 'calc(100vh - 64px)', borderRadius: 3, boxShadow: '0 8px 16px rgba(0,0,0,0.05)' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/photo/:id" element={<PhotoDetail />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
