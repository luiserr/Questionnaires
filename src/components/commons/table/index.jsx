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
import * as PropTypes from 'prop-types';
import {Alert} from "@mui/material";
import Paginator from "./Paginator";

export default function MyTable(
  {
    headers = [],
    data = [],
    pagination,
    actions = null,
    handleSearch
  }) {

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
    <>
      {
        data.length <= 0 ?
          <Alert severity={"warning"}>
            No hay datos para mostrar
          </Alert> :
          <>
            <Paginator
              page={pagination?.page}
              totalPages={pagination?.totalPages ?? 1}
              handleSearch={handleSearch}
              perPage={pagination?.perPage}
            />
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
                      key={uid()}
                      sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                      {drawBody(row)}
                      {<TableCell>
                        {actions(row)}
                      </TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
      }
    </>
  );
}

Table.propTypes = {
  headers: PropTypes.object,
  data: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.func,
  handleSearch: PropTypes.func,
};
