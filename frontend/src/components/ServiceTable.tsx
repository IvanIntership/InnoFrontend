import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableRow, CircularProgress, IconButton, Paper 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type * as Dtos from '../api/types';

export interface ServiceTableProps {
  services: Dtos.ServiceDto[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export const ServiceTable: React.FC<ServiceTableProps> = ({ services, isLoading, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Paper elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && services.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}

          {!isLoading && services.map((service) => (
            <TableRow 
              key={service.id} 
              hover
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(`/services/${service.id}`)}
            >
              <TableCell>{service.name}</TableCell>
              <TableCell>${service.price.toFixed(2)}</TableCell>
              <TableCell align="right">
                <IconButton 
                  color="error" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(service.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};