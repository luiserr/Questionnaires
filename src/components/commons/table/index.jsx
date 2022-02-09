import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {v4 as uid} from 'uuid';

export default function MyTable({headers = [], data = [], pagination = {}}) {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const newData = data.map((row) => {
      const temp = {};
      for (const attr in headers) {
        temp[attr] = row[attr];
      }
      return temp;
    });
    setRows(newData);
  }, [data]);

  const drawBody = (row) => {
    return (
      <>
        {
          Object.keys(headers).map(header =>
            <TableCell key={uid()} component="th" scope="row">
              {row[header]}
            </TableCell>
          )
        }
      </>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              Object.values(headers).map((header, index) => <TableCell key={index}>{header}</TableCell>)
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={uid}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              {drawBody(row)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
