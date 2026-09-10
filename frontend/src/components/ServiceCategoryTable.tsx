import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableRow, CircularProgress, IconButton, Paper 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type * as Dtos from '../api/types';

export interface ServiceCategoryTableProps {
  categories: Dtos.ServiceCategoryDto[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export const ServiceCategoryTable: React.FC<ServiceCategoryTableProps> = ({ categories, isLoading, onDelete }) => {
  const navigate = useNavigate();

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

          {!isLoading && categories.map((category) => (
            <TableRow 
              key={category.id} 
              hover
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(`/categories/${category.id}`)}
            >
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.duration}</TableCell>
              <TableCell align="right">
                <IconButton 
                  color="error" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(category.id);
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