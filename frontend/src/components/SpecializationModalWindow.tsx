import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';
import type * as Dtos from '../api/types';

interface SpecializationModalWindowProps {
  open: boolean;
  specializationToEdit: Dtos.SpecializationDto | null;
  onClose: () => void;
  onSubmit: (data: Dtos.CreateSpecializationDto | Dtos.EditSpecializationInformationDto) => void; 
}

export const SpecializationModalWindow: React.FC<SpecializationModalWindowProps> = ({ open, specializationToEdit, onClose, onSubmit }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (specializationToEdit) {
      setName(specializationToEdit.name);
    } else {
      setName('');
    }
  }, [specializationToEdit, open]);

  const handleSave = () => {
    if (specializationToEdit) {
      onSubmit({
        id: specializationToEdit.id,
        name: name.trim(),
      });
    } else {
      onSubmit({
        name: name.trim(),
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{specializationToEdit ? 'Edit Specialization' : 'Create Specialization'}</DialogTitle>
      
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField 
            label="Specialization Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            autoFocus
          />
        </Stack>
      </DialogContent>
  
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave} disabled={!name.trim()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};