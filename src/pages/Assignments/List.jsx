import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, Chip, Grid} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MyTable from "../../components/commons/table";
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate, useParams} from "react-router-dom";
import {getPresentations} from "../../tools/assignRequests";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import DeleteIcon from '@mui/icons-material/Delete';

const headers = {
  id: 'ID',
  title: 'Título',
  tries: 'Número de intentos',
  startDate: 'Fecha de inicio',
  finishDate: 'Fecha de finalización'
};

export default function List() {

  const [presentations, setPresentations] = useState([]);

  const {testId} = useParams();
  const navigate = useNavigate();

  useEffect(async () => {
    const response = await getPresentations(testId);
    setPresentations(response);
  }, []);

  const actions = [
    {
      title: 'Estado',
      component: (row) =>
        row.status === 'assigned' ?
          <Chip
            label={'Asignado/En ejecución'}
            color={'warning'}
            onDelete={() => {
            }}
            deleteIcon={<AvTimerIcon/>}
          /> :
          <Chip
            label={'Pendiente por asignar'}
            color={'info'}
            onDelete={() => navigate(`/test/${testId}/presentation/${row.id}`)}
            deleteIcon={<SaveAsIcon/>}
          />
    },
    {
      title: 'Editar',
      component: (row) =>
        <Button
          startIcon={<EditIcon/>}
          disabled={row.status === 'assigned'}
          onClick={() => navigate(`/test/${testId}/presentation/${row.id}`)}
        />
    },
    {
      title: 'Cancelar',
      component: (row) =>
        <Button
          startIcon={<DeleteIcon/>}
          disabled={row.status === 'assigned'}
          onClick={() => alert('voy a eliminar la encuesta')}
        />
    }
  ];

  const handleBack = () => {
    navigate('/test');
  };

  return (
    <Box sx={{width: '100%'}}>
      <h4>Lista de asignaciones </h4>
      <Card elevation={2} sx={{mt: 1}}>
        <CardContent>
          {/*<h4>Listado de presentaciones activas</h4>*/}
          {/*<Divider sx={{mb: 2}}/>*/}
          <Button
            sx={{float: 'right'}}
            startIcon={<ArrowBackIcon/>}
            onClick={handleBack}
          >
            Atras
          </Button>
          <Grid container spacing={2}>
            <Grid item xs={12}>

              <MyTable
                headers={headers}
                data={presentations}
                pagination={{}}
                actions={actions}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}