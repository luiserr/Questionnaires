import * as React from 'react';
import {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {deleteTest, searchTest} from '../../tools/testRequests';
import {useNavigate} from "react-router-dom";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MyTable from "../../components/commons/table";
import AddTaskIcon from '@mui/icons-material/AddTask';

const headers = {
  title: 'Título',
  id: 'Id',
  statusDescription: 'Estado',
  ownerName: 'Creador',
  createdAt: 'Fecha de creación',
  presentations: 'Numero de asignaciones'
};

export default function TestList() {
  const [tests, setTests] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10
  });

  const navigate = useNavigate();

  useEffect(async () => {
    await handleSearch(pagination.page, pagination.perPage);
  }, []);

  const handleEdit = (testId) => {
    navigate(`/admin/surveys/test/${testId}`);
  };

  const handleSearch = async (page, perPage) => {
    const response = await searchTest(page, perPage);
    const {data: myTests, pagination} = response;
    await setTests(myTests?.map(test => {
      test['title'] = test.title.length > 50 ? `${test.title?.substring(0, 50)} ...` : test.title;
      return test;
    }));
    await setPagination(pagination);
  };

  const handleDelete = async (testId) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('¿Esta seguro de eliminar esta encuesta?')) {
      await deleteTest(testId);
      await handleSearch(pagination.page, pagination.perPage);
    }
  };

  const actions = [
    {
      title: 'Ver asignaciones',
      component: (row) =>
        <IconButton
          onClick={() => navigate(`/admin/surveys/test/${row.id}/presentations`)}
          disabled={row.statusDescription !== 'Completado'}
          aria-label="view">
          <VisibilityIcon/>
        </IconButton>,
    },
    {
      title: 'Añadir asignación',
      component: (row) =>
        <IconButton
          onClick={() => navigate(`/admin/surveys/test/${row.id}/presentation/_`)}
          disabled={row.statusDescription !== 'Completado'}
          aria-label="view">
          <AddTaskIcon/>
        </IconButton>
    },
    {
      title: 'Ver / Editar',
      component: (row) =>
        <IconButton aria-label="Editar" onClick={() => handleEdit(row.id)}>
          <EditIcon/>
        </IconButton>
    },
    {
      title: 'Eliminar',
      component: (row) =>
        <IconButton
          disabled={parseInt(row.presentations) > 0}
          aria-label="Eliminar"
          onClick={() => handleDelete(row.id)}
        >
          <DeleteIcon/>
        </IconButton>
    }
  ]


  return (
    <Grid container>
      <h4>Listado de encuestas</h4>
      <Grid item xs={12}>
        <MyTable
          handleSearch={handleSearch}
          actions={actions}
          pagination={pagination}
          data={tests}
          headers={headers}
        />
        <Fab
          color="primary"
          alt={'Crear encuesta'}
          title={'Crear encuesta'}
          aria-label="add"
          sx={{float: 'right', marginTop: '2em'}}
          onClick={() => handleEdit('_')}
        >
          <AddIcon/>
        </Fab>
      </Grid>

    </Grid>
  );
}
