import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, Typography } from '@mui/material';
import type * as Dtos from '../api/types';

interface OfficeModalWindowProps {
  open: boolean;
  officeToEdit: Dtos.OfficeDto | null;
  onClose: () => void;
  onSubmit: (data: any, file: File | null) => void; 
}

export const OfficeModalWindow: React.FC<OfficeModalWindowProps> = ({ open, officeToEdit, onClose, onSubmit }) => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (officeToEdit) {
      setAddress(officeToEdit.address);
      setPhone(officeToEdit.phoneNumber);
    } else {
      setAddress('');
      setPhone('');
    }
    setFile(null); 
  }, [officeToEdit, open]);

  const handleSave = () => {
    onSubmit({
      id: officeToEdit?.id,
      address: address,
      phoneNumber: phone,
      photoId: officeToEdit?.photoId,
    }, file);
    
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{officeToEdit ? 'Edit Office' : 'Create Office'}</DialogTitle>
      
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
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
          
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Button variant="outlined" component="label">
              Upload Photo
              <input 
                type="file" 
                hidden 
                accept="image/*" 
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} 
              />
            </Button>
            <Typography variant="body2" color="textSecondary">
              {file ? file.name : (officeToEdit?.photoId ? 'Photo already uploaded' : 'No file selected')}
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
  
      <DialogActions>
      <Button variant="outlined" color="error" onClick={onClose}>
        Cancel
      </Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};