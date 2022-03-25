import * as PropTypes from 'prop-types';
import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Paper, Select, TableCell} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export default function Matrix({question, setQuestion, indexQuestion, preview, readOnly}) {

  const handleChange = (questionId, answerId) => {
    if (!preview) {
      let answers = question?.attempts?.answers ?? [];
      const lastAnswers = answers.findIndex((answer) => answer.questionId === questionId);
      if (lastAnswers >= 0) {
        answers[lastAnswers] = {
          questionId,
          answerId
        }
      } else {
        answers = [...answers, {questionId, answerId}];
      }

      setQuestion({
          ...question,
          attempts: {
            answers,
            save: false
          }
        },
        indexQuestion);
    }
  };

  const getSelected = (questionId) => {
    const lastAnswer = question?.attempts?.answers?.find((answer) => answer.questionId === questionId);
    if (lastAnswer) {
      return lastAnswer['answerId'];
    }
    return '';
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Elementos</TableCell>
            <TableCell align="right">Escala de valoración</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {question?.answers?.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">
                <FormControl fullWidth>
                  <Select
                    id="demo-simple-select"
                    onChange={(e) => handleChange(row.id, e.target.value)}
                    value={getSelected(row.id)}
                    disabled={readOnly}
                  >
                    {
                      row?.answers?.map((answer) => {
                        return <MenuItem key={answer.id} value={answer.id}>{answer.description}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

}

Matrix.propTypes = {
  question: PropTypes.object,
  setQuestion: PropTypes.func.isRequired,
  indexQuestion: PropTypes.number,
};