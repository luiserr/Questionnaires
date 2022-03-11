import React, {useState} from 'react';
import {Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {v4} from "uuid";
import CustomModal from "../../../commons/Modal";
import Dependency from "./Dependency";
import AddLinkIcon from '@mui/icons-material/AddLink';

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

  const handleClick = (currentQuestion) => {
    setQuestion(currentQuestion);
    setVisible(true);
  }

  return (
    <Grid item xs={12}>
      <TableContainer>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align={'center'}>Id</TableCell>
              <TableCell align="center">Título</TableCell>
              <TableCell align="center">Tipo</TableCell>
              <TableCell align="center">Añadir como dependencia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question) => (
              <TableRow
                key={v4()}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell {...center} component="th" scope="row">{question.id}</TableCell>
                <TableCell {...center} component="th" scope="row">{question.title}</TableCell>
                <TableCell {...center} component="th" scope="row">{question.typeDescription}</TableCell>
                <TableCell {...center} component="th" scope="row">
                  <Button
                    alt={'Añadir como dependencia'}
                    title={'Añadir como dependencia'}
                    startIcon={<AddLinkIcon/>}
                    onClick={() => handleClick(question)}
                  />
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
        />
      </CustomModal>
    </Grid>
  );
}