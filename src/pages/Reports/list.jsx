import React, {useEffect, useState} from 'react';

import {Box, Card, CardContent, Chip, Grid, IconButton} from "@mui/material";
import AvTimerIcon from '@mui/icons-material/AvTimer';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import MyTable from "../../components/commons/table";
import {searchReports} from "../../tools/reportRequests";

/*const headers = {
  id: 'ID',
  presentationId: 'Presentación',
  userId: 'Usuario creó el reporte',
  createdAt: 'Fecha de creación',
  finishedAt: 'Fecha de finalización',
  link: 'Descarga'
};*/

const headers = {
  id: 'Id',
  titleTest: 'Nombre de encuesta',
  titlePresentation: 'Nombre de asignación',
  ownerName: 'Creador',
  createdAt: 'Fecha de creación',
  finishedAt: 'Fecha de finalización'
};

export default function ListReports() {

  const [reports, setReports] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5
  });

  useEffect(async () => {
    await handleSearch(pagination.page, pagination.perPage);
  }, []);

  /*useEffect(async () => {
    const response = await getReports();
    await setReports(response);
  }, []);*/

  const handleSearch = async (page, perPage) => {
    const response = await searchReports(page, perPage);
    const {data: myReports, pagination} = response;
    await setReports(myReports);
    await setPagination(pagination);
  };

  const actions = [
    {
      title: 'Estado',
      component: (row) =>
        row.status === 'inProgress' ? <Chip
          label={'Pendiente por ejecutar'}
          color={'default'}
          onDelete={() => {
          }}
          disabled
          deleteIcon={<HourglassBottomIcon/>}
        /> : row.status === 'finished' ? <Chip
          label={'Finalizado'}
          color={'info'}
          onDelete={() => {
          }}
          disabled
          deleteIcon={<CheckCircleOutlineIcon/>}
        /> : <Chip
          label={'En progreso'}
          color={'warning'}
          onDelete={() => {
          }}
          disabled
          deleteIcon={<AvTimerIcon/>}
        />
    },
    {
      title: 'Descargar',
      component: (row) =>
        <IconButton
          disabled={row.status === 'inProgress'}
          onClick={() => {
            window.location = `${row.link}`
          }}
          alt={'Descargar reporte'}
          title={'Descargar reporte'}
          aria-label="Descargar">
          <DownloadIcon/>
        </IconButton>
    }
  ]

  return (
    <Box sx={{width: '100%'}}>
      <h4>Lista de reportes </h4>
      <Card elevation={2} sx={{mt: 1}}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>

            <MyTable
                handleSearch={handleSearch} 
                headers={headers}
                data={reports}
                pagination={pagination}
                actions={actions}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}