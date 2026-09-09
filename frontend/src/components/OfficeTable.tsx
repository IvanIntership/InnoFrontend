import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableRow, CircularProgress, IconButton, Paper 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type * as Dtos from '../api/types';

export interface OfficeTableProps {
  offices: Dtos.OfficeDto[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export const OfficeTable: React.FC<OfficeTableProps> = ({ offices, isLoading, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Paper elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && offices.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}

          {!isLoading && offices.map((office) => (
            <TableRow 
              key={office.id} 
              hover
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(`/offices/${office.id}`)}
            >
              <TableCell>{office.address}</TableCell>
              <TableCell>{office.phoneNumber}</TableCell>
              <TableCell align="right">
                <IconButton 
                  color="error" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(office.id);
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