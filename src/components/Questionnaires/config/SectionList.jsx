import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import * as PropTypes from 'prop-types';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {deleteSection, getSections} from "../../../tools/testRequests";
import Alert from "@mui/material/Alert";


export default function SectionList({test}) {

  const [sections, setSections] = useState([]);

  const navigate = useNavigate();

  useEffect(async () => {
    if (test.id) {
      await handleSearch();
    }
  }, [test]);

  const handleSearch = async () => {
    const data = await getSections(test);
    setSections(data);
  }

  const handleNewSection = () => {
    navigate(`/test/${test.id}/section/_`);
  };

  const handleEdit = (section) => {
    navigate(`/test/${test.id}/section/${section.id}`, {state: {test, section}});
  };

  const handleDelete = async (sectionId) => {
    await deleteSection(test.id, sectionId);
    await handleSearch();
  }

  return (
    <Grid item xs={12}>
      <Button
        disabled={test?.presentations > 0}
        sx={{marginTop: '2em', marginBottom: '2em'}}
        variant="contained"
        onClick={handleNewSection}
      >
        Crear sección
      </Button>
      {
        sections.length > 0 ?

          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Titulo</TableCell>
                  <TableCell align="right">Cantidad de preguntas</TableCell>
                  <TableCell align="right">Cantidad de preguntas configuradas</TableCell>
                  <TableCell align="right">Ver / Editar</TableCell>
                  <TableCell align="right">Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sections.map((section) => (
                  <TableRow
                    key={section.id}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                  >
                    <TableCell component="th" scope="row">
                      {section.title}
                    </TableCell>
                    <TableCell align="right">{section.numberQuestions}</TableCell>
                    <TableCell align="right">{section.savedQuestions}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="Modificar sección" onClick={() => handleEdit(section)}>
                        <EditIcon/>
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        disabled={test.presentations > 0}
                        aria-label="Eliminar sección"
                        onClick={() => handleDelete(section.id)}
                      >
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> :
          <Alert severity="warning">No hay secciones configuradas</Alert>
      }
    </Grid>
  );
}

SectionList.propTypes = {
  test: PropTypes.object.isRequired,
};
