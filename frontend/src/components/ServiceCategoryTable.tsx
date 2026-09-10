import React from 'react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableRow, CircularProgress, IconButton, Paper 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type * as Dtos from '../api/types';

export interface ServiceCategoryTableProps {
  categories: Dtos.ServiceCategoryDto[];
  isLoading: boolean;
  onEdit: (category: Dtos.ServiceCategoryDto) => void;
  onDelete: (id: string) => void;
}

export const ServiceCategoryTable: React.FC<ServiceCategoryTableProps> = ({ categories, isLoading, onEdit, onDelete }) => {
  return (
    <Paper elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && categories.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}

          {categories.map((category) => (
            <TableRow 
              key={category.id} 
              hover
              sx={{ opacity: isLoading ? 0.5 : 1, pointerEvents: isLoading ? 'none' : 'auto' }}
            >
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.duration}</TableCell>
              <TableCell align="right">
                <IconButton 
                  color="primary" 
                  onClick={() => onEdit(category)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  color="error" 
                  onClick={() => onDelete(category.id)}
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