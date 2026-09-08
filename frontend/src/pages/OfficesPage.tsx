import { useState } from 'react';
import { 
  Button, TextField, Table, TableBody, TableCell, 
  TableHead, TableRow, Pagination, Stack, Typography, 
  CircularProgress, IconButton, Paper, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useOffices } from '../hooks/useOffices';
import { OfficeDialog } from '../components/OfficeDialog';
import type * as Dtos from '../api/types';

export const OfficesPage = () => {
  const { 
    offices, isLoading, error, searchParams, totalCount,
    createOffice, updateOffice, deleteOffice, 
    handleSearchChange, handlePageChange 
  } = useOffices();

  const [isOpen, setIsOpen] = useState(false);
  const [editingOffice, setEditingOffice] = useState<Dtos.OfficeDto | null>(null);

  const handleSave = async (data: any) => {
    if (editingOffice) await updateOffice(data);
    else await createOffice(data);
  };

  const totalPages = Math.ceil(totalCount / (searchParams.pageSize || 10));

  return (
    <Box sx={{ p: 4, maxWidth: '1000px', margin: '0 auto' }}>
      
      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Offices</Typography>
        <Button variant="contained" onClick={() => { setEditingOffice(null); setIsOpen(true); }}>
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

      <Paper elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {isLoading && offices.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center"><CircularProgress /></TableCell>
              </TableRow>
            )}

            {!isLoading && offices.map((office) => (
              <TableRow key={office.id}>
                <TableCell>{office.address}</TableCell>
                <TableCell>{office.phoneNumber}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => { setEditingOffice(office); setIsOpen(true); }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => deleteOffice(office.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </Paper>

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

      <OfficeDialog
        open={isOpen}
        officeToEdit={editingOffice}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSave}
      />
    </Box>
  );
};