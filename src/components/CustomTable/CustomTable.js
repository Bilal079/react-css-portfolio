import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import styles from './CustomTable.module.css';

const CustomTable = ({ data }) => {
  if (!data || !data.headers || !data.rows || data.rows.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <TableContainer component={Paper} className={styles.table}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {data.headers.map((header, index) => (
              <TableCell key={index} className={styles.headerRow}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((row, rowIndex) => (
            <TableRow 
              key={rowIndex}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className={styles.dataRow}
            >
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
