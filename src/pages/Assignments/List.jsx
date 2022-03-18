import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, Chip, Grid, Link} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MyTable from "../../components/commons/table";
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate, useParams} from "react-router-dom";
import {deleteAssign, getPresentations} from "../../tools/assignRequests";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import DeleteIcon from '@mui/icons-material/Delete';
import SummarizeIcon from '@mui/icons-material/Summarize';
import {getDomain} from '../../utils/tools';

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
    setPresentations(response?.map(presentation => {
      presentation['title'] = presentation?.title?.length > 50 ? `${presentation.title?.substring(0, 50)} ...` : presentation?.title;
      return presentation;
    }));
  }, []);

  const handleDelete = async (presentationId) => {
    if (await deleteAssign(presentationId)) {
      const response = await getPresentations(testId);
      setPresentations(response);
    }
  };

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
            disabled
            deleteIcon={<AvTimerIcon/>}
          /> :
          row.status === 'canceled' ?
            <Chip
              label={'Cancelada'}
              color={'error'}
              disabled
              deleteIcon={<DeleteIcon/>}
              onDelete={() => {
              }}
            />
            :
            <Chip
              label={'Pendiente por asignar'}
              color={'info'}
              onDelete={() => navigate(`/admin/surveys/test/${testId}/presentation/${row.id}`)}
              deleteIcon={<SaveAsIcon/>}
            />
    },
    {
      title: 'Editar',
      component: (row) =>
        <Button
          color={'secondary'}
          alt={'Editar'}
          title={'Editar'}
          startIcon={<EditIcon/>}
          disabled={row.status !== 'inProgress'}
          onClick={() => navigate(`/admin/surveys/test/${testId}/presentation/${row.id}`)}
        />
    },
    {
      title: 'Cancelar',
      component: (row) =>
        <Button
          alt={'Cancelar'}
          title={'Cancelar'}
          startIcon={<DeleteIcon/>}
          color={'error'}
          disabled={row.status !== 'inProgress'}
          onClick={() => handleDelete(row.id)}
        />
    },
    {
      title: 'Reporte',
      component: (row) =>
        <Button
          alt={'Reporte'}
          title={'Reporte'}
          startIcon={<SummarizeIcon/>}
          color={'error'}
          disabled={row.status !== 'inProgress'}
          onClick={() => navigate(`/admin/surveys/test/${testId}/presentation/${row.id}/report`)}
        />
    },
    {
      title: 'Descargar',
      component: (row) =>
        <Link 
        href={url}
        >Link</Link>
    }
  ];

  const handleBack = () => {
    navigate('/admin/surveys/');
  };

  const domain = getDomain();
  const url = `${domain}`;

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
            Regresar
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