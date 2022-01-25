import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {v4 as uuid} from 'uuid';
import TextField from "@mui/material/TextField";
import PropTypes from 'prop-types';
import Divider from "@mui/material/Divider";
import {Paper} from "@mui/material";
import Box from "@mui/material/Box";


export default function Multiple({answers = [], setAnswer}) {

  const handleNewAnswer = () => {
    const newAnswer = {
      value: '',
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

  return (
    <Box component={Paper}>
      <Grid item xs={12} sx={{marginTop: '2em', padding: '10px'}}>
        <h4>Configurar respuestas</h4>
        <Divider/>
        <br/>
        <Grid xs={6}>
          {answers.map((answer, index) => {
            return (
              <Grid sx={{marginTop: '1em'}}>
                <TextField
                  key={answer.id || uuid()}
                  label={`Respuesta-${index + 1}`}
                  onChange={e => handleChange(index, 'value', e.target.value)}
                  variant="outlined"
                  value={answer.value || ''}
                  fullWidth
                />
              </Grid>
            );
          })
          }
        </Grid>
        <Button onClick={handleNewAnswer}>
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