import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Button, Typography, Paper, 
  CircularProgress, Stack, Snackbar, Alert, Avatar, List, ListItem, ListItemAvatar, ListItemText 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

import { useServices } from '../hooks/useServices';
import { ServiceModalWindow } from '../components/ServiceModalWindow';
import type * as Dtos from '../api/types';

export const ServiceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { 
    getServiceById, updateService, 
    isLoading, error, clearError 
  } = useServices();

  const [service, setService] = useState<Dtos.ServiceDto | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchService = useCallback(async () => {
    if (id) {
      const data = await getServiceById(id);
      setService(data);
    }
  }, [id, getServiceById]);

  useEffect(() => {
    fetchService();
  }, [fetchService]);

  const handleEditSubmit = async (data: Dtos.UpdateServiceDto) => {
    if (!id) return;
    try {
      await updateService({ ...data, id });
      await fetchService();
      setIsEditModalOpen(false);
    } catch {
    }
  };

  if (isLoading && !service) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!service) return <Box sx={{ p: 4 }}><Typography variant="h6" color="error">Service is not found</Typography></Box>;

  return (
    <Box sx={{ p: 4, maxWidth: '800px', margin: '0 auto' }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/services')}>
          Back to Services
        </Button>

        <Button 
          variant="outlined" 
          startIcon={<EditIcon />} 
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit Service
        </Button>
      </Stack>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {service.name}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
            ${service.price.toFixed(2)}
          </Typography>
        </Stack>
        
        <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #eee' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Assigned Doctors ({service.doctors?.length || 0})
          </Typography>
          
          {service.doctors && service.doctors.length > 0 ? (
            <List>
              {service.doctors.map((doctor) => (
                <ListItem key={doctor.id} sx={{ bgcolor: '#f9f9f9', mb: 1, borderRadius: 1 }}>
                  <ListItemAvatar>
                    <Avatar src={doctor.photoId ? `/photos/${doctor.photoId}` : undefined}>
                      {doctor.firstname[0]}{doctor.lastname[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={`${doctor.firstname} ${doctor.lastname}`} 
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="text.secondary">No doctors are currently providing this service.</Typography>
          )}
        </Box>
      </Paper>

      <ServiceModalWindow
        open={isEditModalOpen}
        serviceToEdit={service}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit as any}
      />

      <Snackbar open={!!error} autoHideDuration={6000} onClose={clearError} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={clearError} severity="error" variant="filled" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};