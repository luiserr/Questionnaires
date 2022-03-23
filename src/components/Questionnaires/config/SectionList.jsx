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
import {bold} from "../../../const/styles";


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
    navigate(`/admin/surveys/test/${test.id}/section/_`);
  };

  const handleEdit = (section) => {
    navigate(`/admin/surveys/test/${test.id}/section/${section.id}`, {state: {test, section}});
  };

  const handleDelete = async (sectionId) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('¿Esta seguro de eliminar esta sección?')) {
      await deleteSection(test.id, sectionId);
      await handleSearch();
    }
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

          <TableContainer component={Paper} sx={{p: 2}}>
            <h4>Listado de secciones</h4>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell {...bold} align="center"><b>Título</b></TableCell>
                  <TableCell {...bold} align="center"><b>Cantidad de preguntas configuradas</b></TableCell>
                  <TableCell {...bold} align="center"><b>Ver / Editar</b></TableCell>
                  <TableCell {...bold} align="center"><b>Eliminar</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sections.map((section) => (
                  <TableRow
                    key={section.id}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                  >
                    <TableCell align={'center'} alt={section?.title} title={section?.title}>
                      {section?.title.length > 50 ? `${section?.title?.substring(0, 50)}...` : section?.title}
                    </TableCell>
                    <TableCell align="center">{section.savedQuestions}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="Modificar sección"
                        alt={'Editar'}
                        title={'Editar'}
                        onClick={() => handleEdit(section)}>
                        <EditIcon/>
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        disabled={test.presentations > 0}
                        alt={'Eliminar'}
                        title={'Eliminar'}
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
