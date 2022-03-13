import React, {useEffect, useState} from "react";
import {Grid, TextField} from "@mui/material";
import PropTypes from 'prop-types';
import {toast} from "../../../../utils/alerts";

export default function Numeric({question, answers = [], setAnswer, disabled}) {

  const [min, setMin] = useState(1);
  const [max, setMax] = useState(5);
  const [range, setRange] = useState([]);

  useEffect(() => {
    let newRange = [];
    for (let i = min; i <= max; i++) {
      const oldValue = range.find(item => parseInt(item.id) === i);
      newRange = [...newRange, {
        id: parseInt(oldValue?.id ?? i),
        description: oldValue?.description ?? ''
      }];
    }
    setRange(newRange);
  }, [min, max]);


  const handleMin = (value) => {
    if (!value || value > max) {
      return toast('El número inicial no puede ser vacío ó mayor al final', false);
    }
    setMin(value);
  }

  const handleMax = (value) => {
    if (!value || value < min) {
      return toast('El número final no puede ser vacío ó menor al inicial', false);
    }
    setMax(value);
  }

  const changeValue = (id, value) => {
    const newRange = range.map((item) => {
      if (item.id === id) {
        item = {
          ...item,
          description: value
        }
      }
      return item;
    });
    setRange(newRange);
  }

  const paintInputs = () => {
    return range.map((item) =>
      <Grid key={item.id} item xs={12}>
        <TextField
          label={`Número ${item.id}`}
          value={item.description}
          onChange={(e) => changeValue(item.id, e.target.value)}
        />
      </Grid>
    )
  };

  return (
    <Grid container spacing={2} sx={{mt: 2}}>
      <Grid item xs={3}>
        <TextField
          label={'Número inicial'}
          value={min}
          type={'number'}
          inputProps={{
            min: 1
          }}
          onChange={(e) => handleMin(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label={'Número final'}
          value={max}
          type={'number'}
          inputProps={{
            min: 2
          }}
          onChange={(e) => handleMax(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={10}>
        <Grid item xs={6} container spacing={1}>
          {
            paintInputs()
          }
        </Grid>
      </Grid>
    </Grid>
  );
}

Numeric.propTypes = {
  answers: PropTypes.array.isRequired,
  setAnswer: PropTypes.func.isRequired,
};