import { useState } from 'react';
import { 
  Button, TextField, Pagination, 
  Stack, Typography, Box, Snackbar, Alert 
} from '@mui/material';

import { useSpecializations } from '../hooks/useSpecializations';
import { SpecializationModalWindow } from '../components/SpecializationModalWindow';
import { SpecializationTable } from '../components/SpecializationTable';
import type * as Dtos from '../api/types';

export const SpecializationsPage = () => {
  const { 
    specializations, isLoading, error, searchParams, totalCount,
    createSpecialization, deleteSpecialization, 
    handleSearchChange, handlePageChange, clearError
  } = useSpecializations();

  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async (data: Dtos.CreateSpecializationDto) => {
    await createSpecialization(data);
  };

  const totalPages = Math.ceil(totalCount / (searchParams.pageSize || 10));

  return (
    <Box sx={{ p: 4, maxWidth: '1000px', margin: '0 auto' }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Specializations</Typography>
        <Button variant="contained" onClick={() => setIsOpen(true)}>
          Create Specialization
        </Button>
      </Stack>

      <Stack spacing={2} sx={{ mb: 3 }}>
        <TextField 
          label="Search specializations..." 
          size="small"
          value={searchParams.searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </Stack>

      <SpecializationTable 
        specializations={specializations} 
        isLoading={isLoading} 
        onDelete={deleteSpecialization} 
      />

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination 
            count={totalPages} 
            page={searchParams.pageNumber} 
            onChange={(_, page) => handlePageChange(page)} 
            color="primary" 
          />
        </Box>
      )}

      <SpecializationModalWindow
        open={isOpen}
        specializationToEdit={null}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSave}
      />
      
      <Snackbar open={!!error} autoHideDuration={6000} onClose={clearError} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={clearError} severity="error" variant="filled" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};