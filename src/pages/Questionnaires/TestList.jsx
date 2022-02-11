import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {searchTest} from '../../tools/testRequests';
import {useNavigate} from "react-router-dom";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


export default function TestList() {
  const [tests, setTests] = useState([]);

  const navigate = useNavigate();

  useEffect(async () => {
    const response = await searchTest();
    const {data: myTests, pagination} = response;
    await setTests(myTests);
  }, []);

  const handleEdit = (testId) => {
    navigate(`/test/${testId}`);
  };


  return (
    <Grid container>
      <h4>Listado de cuestionarios</h4>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Titulo</TableCell>
                <TableCell align="right">Ver presentaciones</TableCell>
                <TableCell align="right">Crear presentación</TableCell>
                <TableCell align="right">Editar</TableCell>
                <TableCell align="right">Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.map((test) => (
                <TableRow
                  key={test.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component="th" scope="row">
                    {test.title}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="view">
                      <VisibilityIcon/>
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="view">
                      <AddPhotoAlternateIcon/>
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="Editar" onClick={() => handleEdit(test.id)}>
                      <EditIcon/>
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="delete">
                      <DeleteIcon/>
                    </IconButton></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Fab
          color="primary"
          alt={'Crear cuestionario'}
          title={'Crear cuestionario'}
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
