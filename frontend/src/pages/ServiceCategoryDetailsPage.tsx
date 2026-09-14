import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Paper, Button,
  CircularProgress, Snackbar, Alert 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useServiceCategories } from '../hooks/useServiceCategories';
import { ServiceCategoryDialog } from '../components/ServiceCategoryDialog';
import type * as Dtos from '../api/types';

export const ServiceCategoryDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { 
    getCategoryById, updateCategory, 
    isLoading, error, clearError 
  } = useServiceCategories();

  const [category, setCategory] = useState<Dtos.ServiceCategoryDto | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      getCategoryById(id).then(data => setCategory(data));
    }
  }, [id, getCategoryById]);

  const handleEditSubmit = async (data: any) => {
    await updateCategory(data);
    if (id) {
      const updated = await getCategoryById(id);
      setCategory(updated);
    }
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
          <Typography variant="h6" color="text.secondary">
            Services in this category will appear here...
          </Typography>
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