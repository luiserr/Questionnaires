import React, {useState} from 'react';
import {Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {v4} from "uuid";
import CustomModal from "../../../commons/Modal";
import Dependency from "./Dependency";
import AddLinkIcon from '@mui/icons-material/AddLink';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteDependency} from "../../../../tools/testRequests";
import {useNavigate} from "react-router-dom";

const center = {
  sx: {textAlign: 'center'}
};

export default function QuestionList(
  {
    questions = [],
    testId,
    currentSection,
    currentQuestion,
    dependsOfSection
  }) {

  const [visible, setVisible] = useState(false);
  const [question, setQuestion] = useState({});
  const navigate = useNavigate();

  const handleClick = (currentQuestion) => {
    setQuestion(currentQuestion);
    setVisible(true);
  }

  const handleDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('¿Esta seguro que desea eliminar la dependencia?')) {
      const response = await deleteDependency(currentQuestion.id, currentSection, testId);
      if (response) {
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      }
    }
  };

  return (
    <Grid item xs={12}>
      <TableContainer>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align={'center'}><b>Id</b></TableCell>
              <TableCell align="center"><b>Título</b></TableCell>
              <TableCell align="center"><b>Tipo</b></TableCell>
              <TableCell align="center"><b>Gestionar dependencia</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question) => (
              <TableRow
                key={v4()}
                sx={{
                  '&:last-child td, &:last-child th': {border: 0},
                  backgroundColor: currentQuestion.dependsOfQuestion === question.id ? '#C9E9F5' : '#fff'
                }}
              >
                <TableCell {...center} component="th" scope="row">{question.id}</TableCell>
                <TableCell {...center} component="th" scope="row">{question.title}</TableCell>
                <TableCell {...center} component="th" scope="row">{question.typeDescription}</TableCell>
                <TableCell {...center} component="th" scope="row">
                  {currentQuestion.dependsOfQuestion === question.id ?
                    <Button
                      alt={'Eliminar dependencia'}
                      title={'Eliminar dependencia'}
                      startIcon={<DeleteIcon/>}
                      onClick={handleDelete}
                    />
                    :
                    <Button
                      alt={'Añadir como dependencia'}
                      title={'Añadir como dependencia'}
                      startIcon={<AddLinkIcon/>}
                      onClick={() => handleClick(question)}
                    />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomModal setVisible={setVisible} visible={visible} title={'Añadir dependencia de pregunta'}>
        <Dependency
          question={question}
          testId={testId}
          currentSection={currentSection}
          currentQuestion={currentQuestion}
          dependsOfSection={dependsOfSection}
          setVisible={setVisible}
        />
      </CustomModal>
    </Grid>
  );
}