import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Button, Typography, Paper, 
  CircularProgress, Stack, Snackbar, Alert 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

import { useSpecializations } from '../hooks/useSpecializations';
import { SpecializationModalWindow } from '../components/SpecializationModalWindow';
import type * as Dtos from '../api/types';

export const SpecializationDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { 
    getSpecializationById, updateSpecialization, 
    isLoading, error, clearError 
  } = useSpecializations();

  const [specialization, setSpecialization] = useState<Dtos.SpecializationDto | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchSpecialization = useCallback(async () => {
    if (id) {
      const data = await getSpecializationById(id);
      setSpecialization(data);
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
          <Typography variant="h6" color="text.secondary">
            Doctors and services linked to this specialization will appear here...
          </Typography>
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