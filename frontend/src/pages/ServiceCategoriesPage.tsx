import { useState } from 'react';
import { 
  Button, TextField, Pagination, 
  Stack, Typography, Box, Snackbar, Alert 
} from '@mui/material';

import { useServiceCategories } from '../hooks/useServiceCategories';
import { ServiceCategoryDialog } from '../components/ServiceCategoryDialog';
import { ServiceCategoryTable } from '../components/ServiceCategoryTable';

export const ServiceCategoriesPage = () => {
  const { 
    categories, isLoading, error, searchParams, totalCount,
    createCategory, deleteCategory, 
    handleSearchChange, handlePageChange, clearError
  } = useServiceCategories();

  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async (data: any) => {
    await createCategory(data);
  };

  const totalPages = Math.ceil(totalCount / (searchParams.pageSize || 10));

  return (
    <Box sx={{ p: 4, maxWidth: '1000px', margin: '0 auto' }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Service Categories</Typography>
        <Button variant="contained" onClick={() => setIsOpen(true)}>
          Create Category
        </Button>
      </Stack>

      <Stack spacing={2} sx={{ mb: 3 }}>
        <TextField 
          label="Search categories..." 
          size="small"
          value={searchParams.term}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </Stack>

      <ServiceCategoryTable 
        categories={categories} 
        isLoading={isLoading} 
        onDelete={deleteCategory} 
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

      <ServiceCategoryDialog
        open={isOpen}
        categoryToEdit={null}
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