import React, {useEffect, useState} from 'react';

import {
  Box, 
  Button, 
  Card, 
  CardContent, 
  Chip, 
  Grid, 
  IconButton, 
  Link
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import DeleteIcon from '@mui/icons-material/Delete';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EditIcon from '@mui/icons-material/Edit';

import MyTable from "../../components/commons/table";
import TableFront, {createHeader} from "../../components/commons/TableFront";

import {useNavigate, useParams} from "react-router-dom";
import {searchReports} from "../../tools/reportRequests";
import DownloadIcon from '@mui/icons-material/Download';
import {getDomain} from '../../utils/tools';

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
        <Chip
          label={'Finalizado'}
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
          onClick={() => {window.location = `${row.link}`}}
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