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


export default function QuestionList({test, section}) {

  const [questions, setQuestions] = useState([]);

  useEffect(async () => {
    const response = await getQuestions(test.id, section.id);
    setQuestions(response);
  }, []);

  const navigate = useNavigate();

  const handleNewQuestion = () => {
    navigate(`/test/${test.id}/section/${section.id}/question/_`, {state: {test, section}});
  };

  const handleEditQuestion = (question) => {
    navigate(`/test/${test.id}/section/${section.id}/question/${question.id}`, {state: {test, section, question}});
  };

  return (
    <Grid item xs={12} sx={{marginTop: '15px'}}>
      <h4>Listado de preguntas</h4>
      <Divider/>
      <div style={{marginTop: '2em'}}>
        {questions.length > 0 ? <>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Pregunta</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Cantidad de respuestas configuradas</TableCell>
                    <TableCell>Editar</TableCell>
                    <TableCell>Eliminar</TableCell>
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
                      <TableCell>{question.totalAnswers}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEditQuestion(question)} aria-label="delete">
                          <EditIcon/>
                        </IconButton>
                      </TableCell>
                      <TableCell>
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
      <Button
        sx={{marginTop: '2em', marginBottom: '2em', float: 'right'}}
        variant="outlined"
        onClick={handleNewQuestion}
      >
        Crear pregunta
      </Button>
    </Grid>
  );
}

QuestionList.propTypes = {
  test: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
};
