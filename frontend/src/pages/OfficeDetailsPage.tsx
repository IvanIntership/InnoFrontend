import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper, CircularProgress, Stack, Avatar, Skeleton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

import { officesApi } from '../api/profiles/offices.api';
import { photosApi } from '../api/profiles/photos.api';
import { OfficeModalWindow } from '../components/OfficeDialog';
import type * as Dtos from '../api/types';

export const OfficeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [office, setOffice] = useState<Dtos.OfficeDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchOfficeData();
  }, [id]);

  const fetchOfficeData = () => {
    setIsLoading(true);
    officesApi.getById(id!)
      .then((data) => setOffice(data))
      .catch((err) => console.error('Office loading error', err))
      .finally(() => setIsLoading(false));
  };

  const handleEditSubmit = async (data: any, file: File | null) => {
    try {
      let photoId = data.photoId;
      if (file) {
        const photo = await photosApi.upload(file);
        photoId = photo.id;
      }
      
      await officesApi.update({ ...data, photoId });

      setIsEditModalOpen(false);
      fetchOfficeData(); 
    } catch (error) {
      console.error('Updating error', error);
    }
  };

  if (isLoading) return <Box sx={{ p: 4, textAlign: 'center' }}><CircularProgress /></Box>;
  if (!office) return <Box sx={{ p: 4 }}><Typography variant="h6" color="error">Office is not found</Typography></Box>;

  return (
    <Box sx={{ p: 4, maxWidth: '600px', margin: '0 auto' }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Back to offices
        </Button>

        <Button 
          variant="outlined" 
          startIcon={<EditIcon />} 
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit Office
        </Button>
      </Stack>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack spacing={3} sx={{ alignItems: 'center' }}>
            <PhotoAvatar photoId={office.photoId} />
            
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {office.address}
            </Typography>
            
            <Typography variant="h6" color="textSecondary">
            Phone: {office.phoneNumber}
            </Typography>
        </Stack>
    </Paper>

      <OfficeModalWindow
        open={isEditModalOpen}
        officeToEdit={office}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
      />
    </Box>
  );
};

const PhotoAvatar = ({ photoId }: { photoId?: string | null }) => {
    const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    useEffect(() => {
      if (!photoId) return;
  
      let objectUrl = '';
      const fetchImage = async () => {
        setIsLoading(true);
        try {
          const blob = await photosApi.getById(photoId);
          objectUrl = URL.createObjectURL(blob);
          setImgUrl(objectUrl);
        } catch (error) {
          console.error('Photo loading error');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchImage();
  
      return () => {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
    }, [photoId]);
  
    if (isLoading) return <Skeleton variant="rounded" width={200} height={200} />;
    
    return (
      <Avatar 
        variant="rounded" 
        src={imgUrl} 
        alt="Office" 
        sx={{ width: 200, height: 200, boxShadow: 2 }}
      />
    );
  };