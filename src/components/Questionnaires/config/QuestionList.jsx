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
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import * as PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import {getQuestions} from "../../../tools/testRequests";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";


export default function QuestionList({testId, section}) {

  const [questions, setQuestions] = useState([]);

  useEffect(async () => {
    const response = await getQuestions(testId, section.id);
    setQuestions(response);
  }, []);

  const navigate = useNavigate();

  const handleNewQuestion = () => {
    navigate(`/test/${testId}/section/${section.id}/question/_`);
  };

  return (
    <Grid item xs={12}>
      <Button
        sx={{marginTop: '2em', marginBottom: '2em'}}
        variant="contained"
        onClick={handleNewQuestion}
      >
        Crear pregunta
      </Button>
      <h4>Listado de preguntas</h4>
      <Divider/>
      <div style={{marginTop: '2em'}}>
        {questions.length > 0 ? <>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Pregunta</TableCell>
                    <TableCell align="right">Tipo</TableCell>
                    <TableCell align="right">Cantidad de respuestas configuradas</TableCell>
                    <TableCell align="right">Eliminar</TableCell>
                    <TableCell align="right">Editar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.map((question) => (
                    <TableRow
                      key={question.id}
                      sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                      <TableCell component="th" scope="row">
                        {question.title}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {question.typeDescription}
                      </TableCell>
                      <TableCell align="right">{question.answers.length}</TableCell>
                      <TableCell align="right">
                        <IconButton aria-label="delete">
                          <EditIcon/>
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton aria-label="delete">
                          <DeleteIcon/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
          :
          <Alert severity="warning">No hay preguntas configuradas</Alert>
        }
      </div>
    </Grid>
  );
}

QuestionList.propTypes = {
  testId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sectionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
