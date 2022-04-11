import * as React from 'react';
import {useEffect, useState} from 'react';
import {Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {getRoles} from "../../tools/assignRequests";
import * as PropTypes from 'prop-types';

export default function Roles({data, setData, payload, setPayload, disabled}) {
  const [roles, setRoles] = useState(data.roles ?? []);

  useEffect(async () => {
    if (roles.length === 0) {
      const response = await getRoles();
      setData({
        ...data,
        roles: response
      });
      setRoles(response);
    }
  }, []);

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
    const x = typeof  payload?.roles?.find(rol => rol.id === id) !== 'undefined';
    return x;
  };

  return (
    <>
      <TableContainer>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Rol</TableCell>
              <TableCell align="center">Seleccionar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((rol) => (
              <TableRow
                key={rol.id}
              >
                <TableCell align={'center'} scope="row">
                  {rol.name}
                </TableCell>
                <TableCell align={'center'} scope="row">
                  <Switch
                    disabled={disabled}
                    checked={isChecked(rol.id)}
                    onChange={(e) => handleCheck(e.target.checked, rol)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
};

Roles.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  payload: PropTypes.object,
  setPayload: PropTypes.func,
};