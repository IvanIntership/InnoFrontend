import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';
import type * as Dtos from '../api/types';

interface ServiceCategoryDialogProps {
  open: boolean;
  categoryToEdit: Dtos.ServiceCategoryDto | null;
  onClose: () => void;
  onSubmit: (data: any) => void; 
}

export const ServiceCategoryDialog: React.FC<ServiceCategoryDialogProps> = ({ open, categoryToEdit, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name);
      setDuration(categoryToEdit.duration);
    } else {
      setName('');
      setDuration('');
    }
  }, [categoryToEdit, open]);

  const handleSave = () => {
    if (categoryToEdit) {
      onSubmit({ id: categoryToEdit.id, name, duration });
    } else {
      onSubmit({ name, duration });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{categoryToEdit ? 'Edit Category' : 'Create Category'}</DialogTitle>
      
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField 
            label="Category Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <TextField 
            label="Duration (e.g. 01:00:00)" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)} 
          />
        </Stack>
      </DialogContent>
  
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave} disabled={!name || !duration}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};