import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, Chip, Grid, IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MyTable from "../../components/commons/table";
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate, useParams} from "react-router-dom";
import {deleteAssign, getPresentations} from "../../tools/assignRequests";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import DeleteIcon from '@mui/icons-material/Delete';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import {api} from "../../utils/ajax";

const headers = {
  id: 'ID',
  title: 'Título',
  tries: 'Número de intentos',
  startDate: 'Fecha de inicio',
  finishDate: 'Fecha de finalización',
  affectedGroups: 'Fichas asignadas',
  affectedUsers: 'Usuarios asignados',
  responseUsers: 'Usuarios que presentaron'
};

export default function List() {

  const [presentations, setPresentations] = useState([]);

  const {testId} = useParams();
  const navigate = useNavigate();

  useEffect(async () => {
    const response = await getPresentations(testId);
    setPresentations(response?.map(presentation => {
      presentation['title-long'] = presentation['title'];
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
              disabled
              color={'info'}
              onDelete={() => {
              }}
              // onDelete={() => navigate(`/admin/surveys/test/${testId}/presentation/${row.id}`)}
              deleteIcon={<SaveAsIcon/>}
            />
    },
    {
      title: 'Descargar fichas afectadas',
      component: (row) =>
        <a
          alt={'Descargar fichas afectadas'}
          title={'Descargar fichas afectadas'}
          href={`${api}/tests/presentation/${row.id}/groups/report`}
        >
          <DownloadForOfflineIcon sx={{color: '#5e636e'}}/>
        </a>
    },
    ///admin/surveys/test/:testId/presentation/:presentationId/average
    {
      title: 'Ver consolidado de resultados',
      component: (row) =>
        <IconButton
          alt={'Ver consolidado de resultados'}
          title={'Ver consolidado de resultados'}
          onClick={() => navigate(`/admin/surveys/test/${testId}/presentation/${row.id}/average`)}
        >
          <QueryStatsIcon/>
        </IconButton>
    },
    {
      title: 'Ver/Editar',
      component: (row) =>
        <IconButton
          alt={'Ver/Editar'}
          title={'Ver/Editar'}
          onClick={() => navigate(`/admin/surveys/test/${testId}/presentation/${row.id}`)}
        >
          <EditIcon/>
        </IconButton>
    },
    {
      title: 'Cancelar',
      component: (row) =>
        <IconButton
          alt={'Cancelar'}
          title={'Cancelar'}
          disabled={row.status !== 'inProgress'}
          onClick={() => handleDelete(row.id)}
        >
          <DeleteIcon/>
        </IconButton>
    },
    {
      title: 'Crear reporte',
      component: (row) =>
        <IconButton
          alt={'Crear reporte'}
          title={'Crear reporte'}
          disabled={row.status !== 'assigned'}
          onClick={() => navigate(`/admin/surveys/test/${testId}/presentation/${row.id}/report`)}
        >
          <AssessmentIcon/>
        </IconButton>
    }
  ];

  const handleBack = () => {
    navigate('/admin/surveys/');
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