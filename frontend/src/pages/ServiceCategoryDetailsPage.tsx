import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Paper, Button,
  CircularProgress, Snackbar, Alert,
  List, ListItem, ListItemText 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useServiceCategories } from '../hooks/useServiceCategories';
import { ServiceCategoryDialog } from '../components/ServiceCategoryDialog';
import { servicesApi } from '../api/services/services.api';
import type * as Dtos from '../api/types';

export const ServiceCategoryDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { 
    getCategoryById, updateCategory, 
    isLoading, error, clearError 
  } = useServiceCategories();

  const [category, setCategory] = useState<Dtos.ServiceCategoryDto | null>(null);
  const [services, setServices] = useState<Dtos.ServiceDto[]>([]);
  const [isServicesLoading, setIsServicesLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      getCategoryById(id).then(data => setCategory(data));
      
      setIsServicesLoading(true);
      servicesApi.getByCategoryId(id)
        .then(data => setServices(data))
        .catch(err => console.error("Failed to load services", err))
        .finally(() => setIsServicesLoading(false));
    }
  }, [id, getCategoryById]);

  const handleEditSubmit = async (data: any) => {
    await updateCategory({ ...data, id });
    if (id) {
      const updated = await getCategoryById(id);
      setCategory(updated);
    }
    setIsDialogOpen(false);
  };

  if (isLoading && !category) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!category) return null;

  return (
    <Box sx={{ p: 4, maxWidth: '800px', margin: '0 auto' }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/categories')}
        sx={{ mb: 3 }}
      >
        Back to Categories
      </Button>

      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {category.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Duration: {category.duration}
            </Typography>
          </Box>
          <Button variant="outlined" onClick={() => setIsDialogOpen(true)}>
            Edit Category
          </Button>
        </Box>

        <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #eee' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Services in this Category ({services.length})
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
              No services are currently linked to this category.
            </Typography>
          )}
        </Box>
      </Paper>

      <ServiceCategoryDialog
        open={isDialogOpen}
        categoryToEdit={category}
        onClose={() => setIsDialogOpen(false)}
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