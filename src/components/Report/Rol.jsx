import * as React from 'react';
import {Alert} from "@mui/lab";
import { useEffect, useState } from 'react';
import { 
  Switch, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from "@mui/material";

export default function Roles({ info, setInfo, listRoles, payload, setPayload }) {

  const { data } = info;

  const handleCheck = (checked, row) => {
    let myRoles = [...payload?.roles];
    if (checked) {
      myRoles.push(row);
    } else {
      myRoles = myRoles.filter(rol => parseInt(rol.id) !== parseInt(row.id));
    }
    setPayload({
      ...payload,
      roles: myRoles
    })
  };

  const isChecked = (id) => {
    const x = typeof payload?.roles?.find(rol => rol.id === id);
    if(x === 'undefined')
      return false;
    return true;
  };

  return (
    <>
      { listRoles.length > 0
        ? 
        <TableContainer>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Rol</TableCell>
                <TableCell>Seleccionar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
              listRoles.map((rol)=>(
                <TableRow
                key={rol.id}
              >
                <TableCell component="th" scope="row">
                  {rol.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Switch
                  checked={isChecked(rol.id)}
                  onChange={(e) => handleCheck(e.target.checked, rol)}
                  />
                </TableCell>
              </TableRow>
              ))
            }
            </TableBody>
          </Table>
        </TableContainer>
        : <Alert>No hay datos para mostrar</Alert>
      } 
    </>
  )
};