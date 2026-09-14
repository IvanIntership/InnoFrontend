import { useState } from 'react';
import { 
  Button, TextField, Pagination, 
  Stack, Typography, Box, Snackbar, Alert 
} from '@mui/material';

import { useServices } from '../hooks/useServices';
import { ServiceModalWindow } from '../components/ServiceModalWindow';
import { ServiceTable } from '../components/ServiceTable';
import type * as Dtos from '../api/types';

export const ServicesPage = () => {
  const { 
    services, isLoading, error, searchParams, totalCount,
    createService, deleteService, 
    handleSearchChange, handlePageChange, clearError
  } = useServices();

  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async (data: Dtos.AddServiceDto) => {
    await createService(data);
  };

  const totalPages = Math.ceil(totalCount / (searchParams.pageSize || 10));

  return (
    <Box sx={{ p: 4, maxWidth: '1000px', margin: '0 auto' }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Services</Typography>
        <Button variant="contained" onClick={() => setIsOpen(true)}>
          Create Service
        </Button>
      </Stack>

      <Stack spacing={2} sx={{ mb: 3 }}>
        <TextField 
          label="Search services..." 
          size="small"
          value={searchParams.term || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </Stack>

      <ServiceTable 
        services={services} 
        isLoading={isLoading} 
        onDelete={deleteService} 
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

      <ServiceModalWindow
        open={isOpen}
        serviceToEdit={null}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSave as any}
      />
      
      <Snackbar open={!!error} autoHideDuration={6000} onClose={clearError} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={clearError} severity="error" variant="filled" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};