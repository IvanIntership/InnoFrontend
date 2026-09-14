import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Button, Typography, Paper, 
  CircularProgress, Stack, Snackbar, Alert,
  List, ListItem, ListItemText 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { useSpecializations } from '../hooks/useSpecializations';
import { SpecializationModalWindow } from '../components/SpecializationModalWindow';
import { servicesApi } from '../api/services/services.api';
import type * as Dtos from '../api/types';

export const SpecializationDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { 
    getSpecializationById, updateSpecialization, 
    isLoading, error, clearError 
  } = useSpecializations();

  const [specialization, setSpecialization] = useState<Dtos.SpecializationDto | null>(null);
  const [services, setServices] = useState<Dtos.ServiceDto[]>([]);
  const [isServicesLoading, setIsServicesLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchSpecialization = useCallback(async () => {
    if (id) {
      const data = await getSpecializationById(id);
      setSpecialization(data);
      setIsServicesLoading(true);
      servicesApi.getBySpecializationId(id)
        .then(data => setServices(data))
        .catch(err => console.error("Failed to load services", err))
        .finally(() => setIsServicesLoading(false));
    }
  }, [id, getSpecializationById]);

  useEffect(() => {
    fetchSpecialization();
  }, [fetchSpecialization]);

  const handleEditSubmit = async (data: Dtos.EditSpecializationInformationDto) => {
    if (!id) return;

    try {
      await updateSpecialization({ ...data, id });
      await fetchSpecialization();
      setIsEditModalOpen(false);
    } catch {
    }
  };

  if (isLoading && !specialization) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!specialization) return <Box sx={{ p: 4 }}><Typography variant="h6" color="error">Specialization is not found</Typography></Box>;

  return (
    <Box sx={{ p: 4, maxWidth: '800px', margin: '0 auto' }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/specializations')}>
          Back to Specializations
        </Button>

        <Button 
          variant="outlined" 
          startIcon={<EditIcon />} 
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit Specialization
        </Button>
      </Stack>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {specialization.name}
          </Typography>
        </Box>

        <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #eee' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Services in this Specialization ({services.length})
          </Typography>
          
          {isServicesLoading ? (
            <CircularProgress size={24} />
          ) : services.length > 0 ? (
            <List>
              {services.map((service) => (
                <ListItem 
                  key={service.id} 
                  sx={{ 
                    bgcolor: '#f9f9f9', 
                    mb: 1, 
                    borderRadius: 1, 
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#f0f0f0' } 
                  }}
                  onClick={() => navigate(`/services/${service.id}`)}
                >
                  <ListItemText 
                    primary={service.name} 
                    secondary={`Price: $${service.price.toFixed(2)}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="text.secondary">
              No services are currently linked to this specialization.
            </Typography>
          )}
        </Box>
      </Paper>

      <SpecializationModalWindow
        open={isEditModalOpen}
        specializationToEdit={specialization}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
      />

      <Snackbar open={!!error} autoHideDuration={6000} onClose={clearError} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={clearError} severity="error" variant="filled" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};