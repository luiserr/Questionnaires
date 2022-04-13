import React, {useState} from 'react';
import {Button, Grid, TextField, Typography} from "@mui/material";
import SelectedUsers from "./SelectedUsers";
import {getUsers} from "../../../tools/assignRequests";
import MyTable from "../../commons/table";
import TableFront, {createHeader} from "../../commons/TableFront";

const headers = [
  createHeader('id', 'ID'),
  createHeader('uid', 'Número de documento'),
  createHeader('name', 'Nombre'),
  createHeader('email', 'Correo electrónico'),
];

export default function FormUser({data, setData, payload, setPayload, disabled}) {

  const [term, setTerm] = useState('');

  const handleSearch = async () => {
    const response = await getUsers(term);
    if (response) {
      setData({
        ...data,
        users: response
      });
    }
  };

  const handleCheck = (checked, row) => {
    let myUsers = payload?.users ?? [];
    if (checked) {
      if (!myUsers.find(user => user.id === row.id)) {
        myUsers.push(row);
      }
    } else {
      myUsers = myUsers.filter(user => user.id !== row.id);
    }
    setPayload({
      ...payload,
      users: myUsers
    });
  };

  const handleCheckAll = (checked) => {
    let myUsers = [];
    if (checked) {
      myUsers = [...data.users];
    }
    setPayload({
      ...payload,
      users: myUsers
    });
  };

  const rowSelected = () => {
    return payload?.users?.map(user => user.id);
  }

  return (
    <Grid container>
      <Grid container spacing={2} item xs={12}>
        <Grid item xs={7}>
          <TextField
            disabled={disabled}
            fullWidth
            label={'Busqueda de usuario por nombre / e-mail / Número de documento'}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            disabled={term.length < 4}
            variant={'contained'}
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>
      <Grid container xs={12} sx={{mt: 2}}>
        <Grid item xs={12} sx={{mt: 2}}>
          <TableFront
            disabled={disabled}
            headers={headers}
            rows={data?.users}
            rowSelected={rowSelected()}
            title={'Selección de usuarios'}
            handleSelectAll={handleCheckAll}
            handleSelect={handleCheck}
          />
        </Grid>
        <Grid item xs={12} sx={{mt: 2}}>
          <Typography>Usuarios seleccionados: </Typography>
          <SelectedUsers payload={payload} setPayload={setPayload} disabled={disabled}/>
        </Grid>
      </Grid>
    </Grid>
  );
}