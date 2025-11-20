// src/HomePage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Card, CardMedia, CardActionArea, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

function HomePage() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const apiKey = process.env.REACT_APP_UNSPLASH_KEY;

  // API çağrısını useCallback ile sarmalıyoruz
  const fetchPhotos = useCallback(async (pageNum = 1) => {
    try {
      const response = await axios.get('https://api.unsplash.com/photos', {
        params: { per_page: 12, page: pageNum },
        headers: { Authorization: `Client-ID ${apiKey}` },
      });
      setPhotos(prev => [...prev, ...response.data]);
    } catch (error) {
      console.error('Fotoğraflar yüklenirken hata oluştu:', error);
    }
  }, [apiKey]);

  useEffect(() => {
    fetchPhotos(page);
  }, [fetchPhotos, page]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const goToDetail = (id) => navigate(`/photo/${id}`);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 64px)' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Popüler Fotoğraflar
      </Typography>

      <Grid container spacing={3}>
        {photos.map((photo, index) => (
          <Grid item key={photo.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
              <CardActionArea onClick={() => openLightbox(index)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={photo.urls?.small || ''}
                  alt={photo.alt_description || 'Unsplash Photo'}
                  sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
                />
              </CardActionArea>
              <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => goToDetail(photo.id)}
                  sx={{ borderRadius: 2, textTransform: 'none' }}
                >
                  Detayları Gör
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          onClick={() => setPage(prev => prev + 1)}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Daha Fazla Göster
        </Button>
      </Box>

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={photos.map(p => ({ src: p.urls?.regular }))}
          plugins={[Thumbnails]}
          index={currentIndex}
          on={{ slideChange: (newIndex) => setCurrentIndex(newIndex) }}
        />
      )}
    </Box>
  );
}

export default HomePage;
