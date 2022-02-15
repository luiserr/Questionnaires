import React, {useEffect} from "react";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {v4 as uid} from "uuid";
import * as PropTypes from 'prop-types';
import TextField from "@mui/material/TextField";

const defaultAnswer = () => {
  return [
    {description: 'Falso', id: uid()},
    {description: 'Verdadero', id: uid()},
  ];
};

export default function Boolean({answers, setAnswer, disabled}) {

  useEffect(() => {
    if (!answers.length) {
      setAnswer(defaultAnswer());
    }
  }, []);

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
        <Grid item xs={6}>
          {
            answers.map((answer, index) => (
              <Grid key={index} sx={{marginTop: '1em'}}>
                <TextField
                  fullWidth
                  disabled={disabled}
                  label={`Respuesta ${index + 1}:`}
                  value={answer.description}
                  onChange={e => handleChange(index, 'description', e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    </Box>
  );
};

Boolean.propTypes = {
  answers: PropTypes.array.isRequired,
  setAnswer: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};