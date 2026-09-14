import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableRow, CircularProgress, IconButton, Paper 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type * as Dtos from '../api/types';

export interface SpecializationTableProps {
  specializations: Dtos.SpecializationDto[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export const SpecializationTable: React.FC<SpecializationTableProps> = ({ specializations, isLoading, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Paper elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && specializations.length === 0 && (
            <TableRow>
              <TableCell colSpan={2} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}

          {!isLoading && specializations.map((spec) => (
            <TableRow 
              key={spec.id} 
              hover
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(`/specializations/${spec.id}`)}
            >
              <TableCell>{spec.name}</TableCell>
              <TableCell align="right">
                <IconButton 
                  color="error" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(spec.id);
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