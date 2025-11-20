// src/PhotoDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, CardContent, CircularProgress } from '@mui/material';
import axios from 'axios';

function PhotoDetail() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.REACT_APP_UNSPLASH_KEY;

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
          headers: { Authorization: `Client-ID ${apiKey}` },
        });
        setPhoto(response.data);
      } catch (error) {
        console.error('Fotoğraf yüklenirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhoto();
  }, [id, apiKey]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (!photo) return <Typography>Fotoğraf bulunamadı.</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: { xs: 2, md: 4 } }}>
      <Card sx={{ maxWidth: 800, width: '100%', borderRadius: 3, boxShadow: '0 12px 32px rgba(0,0,0,0.15)' }}>
        <CardMedia
          component="img"
          image={photo.urls?.regular}
          alt={photo.alt_description || 'Fotoğraf'}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>{photo.description || photo.alt_description || 'Fotoğraf Detayı'}</Typography>
          <Typography variant="body2" color="text.secondary">
            {photo.user?.name && `Fotoğrafçı: ${photo.user.name}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {photo.created_at && `Tarih: ${new Date(photo.created_at).toLocaleDateString()}`}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PhotoDetail;
