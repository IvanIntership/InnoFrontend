import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';
import type * as Dtos from '../api/types';

interface ServiceCategoryDialogProps {
  open: boolean;
  categoryToEdit: Dtos.ServiceCategoryDto | null;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void> | void; 
}

export const ServiceCategoryDialog: React.FC<ServiceCategoryDialogProps> = ({ open, categoryToEdit, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (categoryToEdit) {
        setName(categoryToEdit.name);
        setDuration(categoryToEdit.duration);
      } else {
        setName('');
        setDuration('');
      }
    } catch (error) {
      console.error('Error setting form values:', error);
    } finally {
    }
  }, [categoryToEdit, open]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = categoryToEdit
        ? { id: categoryToEdit.id, name, duration }
        : { name, duration };

      await onSubmit(payload);
      onClose();
    } catch (error) {
      console.error('Failed to save category:', error);
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
          />
          <TextField 
            label="Duration (e.g. 01:00:00)" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)} 
            disabled={loading}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave} disabled={!name || !duration || loading}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};