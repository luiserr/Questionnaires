import React, {useState} from 'react';
import {Button, Grid, TextField, Typography} from "@mui/material";
import TableFront, {createHeader} from "../../commons/TableFront";
import SelectedGroup from "./SelectedGroup";
import {getManualGroups} from "../../../tools/assignRequests";

const headers = [
  createHeader('id', 'Id'),
  createHeader('groupId', 'Id ficha'),
  createHeader('name', 'Nombre de la ficha')
];

export default function FormGroup({data, setData, payload, setPayload, disabled}) {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [groupId, setGroupId] = useState('');

  const handleSearch = async () => {
    const response = await getManualGroups(id, groupId, name);
    if (response) {
      setData({
        ...data,
        groups: response
      });
    }
  };

  const handleCheck = (checked, row) => {
    let myGroups = payload?.groups?.groups ?? [];
    if (checked) {
      if (!myGroups.find(group => group.id === row.id)) {
        myGroups.push(row);
      }
    } else {
      myGroups = myGroups.filter(rol => rol.id !== row.id);
    }
    setPayload({
      ...payload,
      groups: {
        ...payload?.groups,
        groups: myGroups
      }
    });
  };

  const handleCheckAll = (checked) => {
    let myGroups = [];
    if (checked) {
      myGroups = [...data.groups];
    }
    setPayload({
      ...payload,
      groups: {
        ...payload?.groups,
        groups: myGroups
      }
    });
  };

  const rowSelected = () => {
    return payload?.groups?.groups?.map(group => group.id);
  }

  return (
    <Grid container>
      <Grid container spacing={2} item xs={12}>
        {/*<Grid item xs={2}>*/}
        {/*  <TextField*/}
        {/*    fullWidth*/}
        {/*    label={'Id de la ficha'}*/}
        {/*    value={groupId}*/}
        {/*    onChange={(e) => setGroupId(e.target.value)}*/}
        {/*  />*/}
        {/*</Grid>*/}
        <Grid item xs={4}>
          <TextField
            disabled={disabled}
            fullWidth
            label={'Nombre de la ficha / Id de la ficha'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        {/*<Grid item xs={2}>*/}
        {/*  <TextField*/}
        {/*    fullWidth*/}
        {/*    label={'Id del grupo'}*/}
        {/*    value={id}*/}
        {/*    onChange={(e) => setId(e.target.value)}*/}
        {/*  />*/}
        {/*</Grid>*/}
        <Grid item xs={2}>
          <Button
            disabled={disabled || name.length < 2}
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
            rows={data?.groups ?? payload?.groups?.groups ?? []}
            handleSelect={handleCheck}
            handleSelectAll={handleCheckAll}
            title={'Búsqueda de fichas'}
            rowSelected={rowSelected()}
          />
        </Grid>
        <Grid item xs={12} sx={{mt: 2}}>
          <Typography>Fichas seleccionadas: </Typography>
          <SelectedGroup payload={payload} setPayload={setPayload} disabled={disabled}/>
        </Grid>
      </Grid>
    </Grid>
  );
}