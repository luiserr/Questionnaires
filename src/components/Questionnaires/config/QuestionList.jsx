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
import {deleteQuestion, getQuestions} from "../../../tools/testRequests";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import AddLinkIcon from '@mui/icons-material/AddLink';


export default function QuestionList({test, section}) {

  const [questions, setQuestions] = useState([]);

  useEffect(async () => {
    await handleSearch();
  }, []);

  const handleSearch = async () => {
    const response = await getQuestions(test.id, section.id);
    setQuestions(response);
  }

  const navigate = useNavigate();

  const handleNewQuestion = () => {
    navigate(`/admin/surveys/test/${test.id}/section/${section.id}/question/_`, {state: {test, section}});
  };

  const handleEditQuestion = (question) => {
    navigate(`/admin/surveys/test/${test.id}/section/${section.id}/question/${question.id}`, {state: {test, section, question}});
  }

  const handleDependency = (question) => {
    navigate(`/admin/surveys/test/${test.id}/section/${section.id}/question/${question.id}/dependency`, {state: {test, section, question}});
  };

  const handleBank = () => {
    navigate(`/admin/surveys/test/${test.id}/section/${section.id}/question/bank`);
  };

  const handleDelete = async (questionId) => {
    await deleteQuestion(test.id, section.id, questionId);
    await handleSearch();
  }

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
                    <TableCell>Respuestas configuradas</TableCell>
                    <TableCell>Es condición</TableCell>
                    <TableCell>Depende de:</TableCell>
                    <TableCell>Añadir dependencia</TableCell>
                    <TableCell>Ver / Editar</TableCell>
                    <TableCell>Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.map((question) => (
                    <TableRow
                      key={question.id}
                      sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                      <TableCell alt={question?.title} title={question?.title}>
                        {question?.title.length > 50 ? `${question?.title?.substring(0, 50)}...` : question?.title}
                      </TableCell>
                      <TableCell scope="row">
                        {question.typeDescription}
                      </TableCell>
                      <TableCell>{question.totalAnswers}</TableCell>
                      <TableCell>{question.conditional ? 'Si' : 'No'}</TableCell>
                      <TableCell>{question.dependency ? question.dependency : 'No tiene dependencias'}</TableCell>
                      <TableCell>
                        <IconButton
                          disabled={test.presentations > 0}
                          alt={'Añadir dependencia'}
                          title={'Añadir dependencia'}
                          onClick={() => handleDependency(question)}
                          aria-label="dependency">
                          <AddLinkIcon/>
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          alt={'Ver / Editar'}
                          title={'Ver / Editar'}
                          onClick={() => handleEditQuestion(question)}
                          aria-label="delete">
                          <EditIcon/>
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          disabled={test.presentations > 0}
                          aria-label="Eliminar"
                          alt={'Eliminar'}
                          title={'Eliminar'}
                          onClick={()=> handleDelete(question.id)}
                        >
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
      <Grid sx={{marginTop: '2em', marginBottom: '2em', float: 'right'}}>
        <Button
          variant="contained"
          onClick={handleNewQuestion}
          color={"success"}
          disabled={test.presentations > 0}
        >
          Crear pregunta
        </Button>
        <Button
          sx={{marginLeft: '5px'}}
          variant="outlined"
          color={"info"}
          onClick={handleBank}
          disabled={test.presentations > 0}
        >
          Banco de preguntas
        </Button>
      </Grid>
    </Grid>
  );
}

QuestionList.propTypes = {
  test: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
};
