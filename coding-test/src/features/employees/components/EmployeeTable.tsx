import {
  Avatar,
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { formatCurrency, formatDate, getInitials } from '@utils/format';

import type { Employee } from '../types';

interface EmployeeTableProps {
  employees: Employee[];
}

function EmployeeTable({ employees }: EmployeeTableProps): ReactElement {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('employees.table.employee')}</TableCell>
            <TableCell>{t('employees.table.jobTitle')}</TableCell>
            <TableCell>{t('employees.table.department')}</TableCell>
            <TableCell>{t('employees.table.location')}</TableCell>
            <TableCell align="right">{t('employees.table.salary')}</TableCell>
            <TableCell>{t('employees.table.hireDate')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} hover>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.light' }}>
                    {getInitials(employee.firstName, employee.lastName)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {employee.firstName} {employee.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {employee.email}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{employee.jobTitle}</Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={employee.department}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {employee.location}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" fontWeight={600}>
                  {formatCurrency(employee.salary)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(employee.hireDate)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {employees.length === 0 && (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            {t('employees.table.noEmployees')}
          </Typography>
        </Box>
      )}
    </TableContainer>
  );
}

export default EmployeeTable;
