import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';
import type * as Dtos from '../api/types';

interface Props {
  open: boolean;
  officeToEdit: Dtos.OfficeDto | null;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const OfficeDialog: React.FC<Props> = ({ open, officeToEdit, onClose, onSubmit }) => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (officeToEdit) {
      setAddress(officeToEdit.address);
      setPhone(officeToEdit.phoneNumber);
    } else {
      setAddress('');
      setPhone('');
    }
  }, [officeToEdit, open]);

  const handleSave = () => {
    onSubmit({
      id: officeToEdit?.id,
      address: address,
      phoneNumber: phone,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{officeToEdit ? 'Edit Office' : 'Create Office'}</DialogTitle>
      
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField 
            label="Address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
          />
          <TextField 
            label="Phone Number" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
          />
        </Stack>
      </DialogContent>
  
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};