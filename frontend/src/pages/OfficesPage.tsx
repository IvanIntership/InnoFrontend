import { useState } from 'react';
import { 
  Button, TextField, Pagination, 
  Stack, Typography, Box 
} from '@mui/material';

import { useOffices } from '../hooks/useOffices';
import { OfficeModalWindow } from '../components/OfficeDialog';
import { OfficeTable } from '../components/OfficeTable';

export const OfficesPage = () => {
  const { 
    offices, isLoading, error, searchParams, totalCount,
    createOffice, deleteOffice, 
    handleSearchChange, handlePageChange 
  } = useOffices();

  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async (data: any, file: File | null) => {
    await createOffice(data, file);
  };

  const totalPages = Math.ceil(totalCount / (searchParams.pageSize || 10));

  return (
    <Box sx={{ p: 4, maxWidth: '1000px', margin: '0 auto' }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Offices</Typography>
        <Button variant="contained" onClick={() => setIsOpen(true)}>
          Create Office
        </Button>
      </Stack>

      <Stack spacing={2} sx={{ mb: 3 }}>
        {error && <Typography color="error">{error}</Typography>}
        <TextField 
          label="Search offices..." 
          size="small"
          value={searchParams.searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </Stack>

      <OfficeTable 
        offices={offices} 
        isLoading={isLoading} 
        onDelete={deleteOffice} 
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

      <OfficeModalWindow
        open={isOpen}
        officeToEdit={null}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSave}
      />
    </Box>
  );
};