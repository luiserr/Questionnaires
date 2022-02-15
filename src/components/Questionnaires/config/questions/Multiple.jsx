import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {v4 as uuid} from 'uuid';
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import {Paper} from "@mui/material";
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';


export default function Multiple({answers = [], setAnswer, disabled}) {

  const handleNewAnswer = () => {
    const newAnswer = {
      description: '',
      id: uuid()
    };
    setAnswer([...answers, newAnswer]);
  };

  const handleChange = (index, key, value) => {
    setAnswer(
      answers.map((answer, i) => {
        if (index === i) {
          return {
            ...answer,
            [key]: value
          }
        }
        return answer;
      })
    );
  };

  const deleteAnswer = (answerId) => {
    const data = answers.filter((answer) => answer.id !== answerId);
    setAnswer(data);
  };

  return (
    <Box component={Paper}>
      <Grid item xs={12} sx={{marginTop: '2em', padding: '10px'}}>
        <h4>Configurar respuestas</h4>
        <Divider/>
        <br/>
        <Grid item xs={6}>
          {answers.map((answer, index) => {
            return (
              <Grid sx={{marginTop: '1em'}} key={index}>
                <TextField
                  key={answer.id || uuid()}
                  disabled={disabled}
                  label={`Respuesta ${index + 1}:`}
                  onChange={e => handleChange(index, 'description', e.target.value)}
                  variant="outlined"
                  value={answer.description || ''}
                  InputProps={{
                    endAdornment: !disabled &&
                      <DeleteIcon onClick={() => deleteAnswer(answer.id)} sx={{cursor: 'pointer'}}/>
                  }}
                  fullWidth
                />
              </Grid>
            );
          })
          }
        </Grid>
        <Button
          disabled={disabled}
          sx={{marginTop: '1.5em'}}
          variant="outlined"
          onClick={handleNewAnswer}>
          Nueva respuesta
        </Button>
      </Grid>
    </Box>
  );
}

Multiple.propTypes = {
  answers: PropTypes.array.isRequired,
  setAnswer: PropTypes.func.isRequired,
};