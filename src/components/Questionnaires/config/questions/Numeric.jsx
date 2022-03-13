import React, {useEffect, useState} from "react";
import {Grid, TextField} from "@mui/material";
import PropTypes from 'prop-types';
import {toast} from "../../../../utils/alerts";
import {v4} from "uuid";

export default function Numeric({question, answers: range = [], setAnswer: setRange, disabled}) {

  const [min, setMin] = useState(range[0]?.value ?? 1);
  const [max, setMax] = useState(range[range.length - 1]?.value ?? 3);

  useEffect(() => {
    let newRange = [];
    for (let i = min; i <= max; i++) {
      const oldValue = range.find(item => parseInt(item.value) === i);
      newRange = [...newRange, {
        id: oldValue?.id ?? v4(),
        value: parseInt(oldValue?.value ?? i),
        description: oldValue?.description ?? ''
      }];
    }
    setRange(newRange);
  }, [min, max]);

  useEffect(() => {
    if (range?.length) {
      setMax(range[range.length - 1]?.value);
    }
  }, [range])


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

  const changeValue = (index, value) => {
    const newRange = range.map((item) => {
      if (item.value === index) {
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
    return range?.map((item) =>
      <Grid key={item.value} item xs={12}>
        <TextField
          label={`Número ${item.value}`}
          value={item.description}
          disabled={disabled}
          onChange={(e) => changeValue(item.value, e.target.value)}
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
          disabled={disabled}
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
          disabled={disabled}
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