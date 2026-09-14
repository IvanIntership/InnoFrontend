import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Stack, FormControl, InputLabel, Select, MenuItem 
} from '@mui/material';
import type * as Dtos from '../api/types';
import { useSpecializations } from '../hooks/useSpecializations';
import { useServiceCategories } from '../hooks/useServiceCategories'; 

interface ServiceModalWindowProps {
  open: boolean;
  serviceToEdit: Dtos.ServiceDto | null;
  onClose: () => void;
  onSubmit: (data: Dtos.AddServiceDto | Dtos.UpdateServiceDto) => void; 
}

export const ServiceModalWindow: React.FC<ServiceModalWindowProps> = ({ open, serviceToEdit, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [specializationId, setSpecializationId] = useState('');
  const [serviceCategoryId, setServiceCategoryId] = useState('');
  const { specializations, handlePageSizeChange: setSpecLimit } = useSpecializations();
  const { categories, handlePageSizeChange: setCatLimit } = useServiceCategories();

  useEffect(() => {
    setSpecLimit(1000);
    setCatLimit(1000);
  }, []);

  useEffect(() => {
    if (serviceToEdit) {
      setName(serviceToEdit.name);
      setPrice(serviceToEdit.price);
      setSpecializationId(serviceToEdit.specializationId);
      setServiceCategoryId(serviceToEdit.serviceCategoryId);
    } else {
      setName('');
      setPrice('');
      setSpecializationId('');
      setServiceCategoryId('');
    }
  }, [serviceToEdit, open]);

  const handleSave = () => {
    const payload = {
      name: name.trim(),
      price: Number(price),
      specializationId,
      serviceCategoryId
    };

    if (serviceToEdit) {
      onSubmit({ ...payload, id: serviceToEdit.id });
    } else {
      onSubmit(payload);
    }
    onClose();
  };

  const isFormValid = name.trim() && price !== '' && Number(price) >= 0 && specializationId && serviceCategoryId;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{serviceToEdit ? 'Edit Service' : 'Create Service'}</DialogTitle>
      
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField 
            label="Service Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <TextField 
            label="Price" 
            type="number"
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
          />
          
          <FormControl fullWidth>
            <InputLabel>Specialization</InputLabel>
            <Select
              value={specializationId}
              label="Specialization"
              onChange={(e) => setSpecializationId(e.target.value)}
            >
              {specializations.map((spec) => (
                <MenuItem key={spec.id} value={spec.id}>{spec.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={serviceCategoryId}
              label="Category"
              onChange={(e) => setServiceCategoryId(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
  
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave} disabled={!isFormValid}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};