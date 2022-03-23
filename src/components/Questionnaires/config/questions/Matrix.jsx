import React, {useEffect, useState} from "react";
import {Button, Divider, Grid, TextField, Typography} from "@mui/material";
import PropTypes from 'prop-types';
import {toast} from "../../../../utils/alerts";
import {v4} from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Matrix({question, answers = [], setAnswer, disabled}) {

  const [min, setMin] = useState(1);
  const [max, setMax] = useState(3);

  useEffect(() => {
    const formattedAnswer = formatQuestion(answers);
    setAnswer(formattedAnswer);
  }, []);

  useEffect(() => {
    let secondColumn = [];
    for (let i = min; i <= max; i++) {
      const oldValue = answers?.secondColumn?.find(item => parseInt(item.value) === i);
      secondColumn = [...secondColumn, {
        id: oldValue?.id ?? v4(),
        value: parseInt(oldValue?.value ?? i),
        description: oldValue?.description ?? ''
      }];
    }
    setAnswer({
      ...answers,
      secondColumn
    });
  }, [min, max]);

  const formatQuestion = (answers) => {
    let firstColumn = [];
    let secondColumn = [];
    if (answers.length) {
      const firstSubQuestion = answers[0];
      const answerSubQuestions = firstSubQuestion['answers'];
      firstColumn = answers.map(({id, title}) => ({
        id,
        title
      }));
      secondColumn = answerSubQuestions.map(({id, description, value}) => ({
        id,
        description,
        value
      }));
      setMax(answerSubQuestions[0]?.value);
      setMax(answerSubQuestions[answerSubQuestions.length - 1]?.value);
    }
    return {
      firstColumn,
      secondColumn
    };
  }

  const handleMin = (value) => {
    if (!value || value > (max - 1)) {
      return toast('El número inicial no puede ser vacío ó mayor al final', false);
    }
    setMin(value);
  }

  const handleMax = (value) => {
    if (!value || value < (min + 1)) {
      return toast('El número final no puede ser vacío ó menor al inicial', false);
    }
    setMax(value);
  }

  const changeValue = (index, value) => {
    const secondColumn = answers?.secondColumn?.map((item) => {
      if (item.value === index) {
        item = {
          ...item,
          description: value
        }
      }
      return item;
    });
    setAnswer({
      ...answers,
      secondColumn
    });
  }

  const handleNewElement = () => {
    let firstColumn = answers.firstColumn ?? [];
    firstColumn = [...firstColumn, {id: v4(), title: ''}];
    setAnswer({
      ...answers,
      firstColumn
    });
  };

  const handleChangeElement = (id, title) => {
    const firstColumn = answers?.firstColumn?.map((item) => {
      if (item.id === id) {
        item = {
          ...item,
          title
        }
      }
      return item;
    });
    setAnswer({
      ...answers,
      firstColumn
    });
  }

  const paintInputs = () => {
    return answers?.secondColumn?.map((item) =>
      <Grid key={item.value} item xs={2}>
        <TextField
          fullWidth
          label={`Número ${item.value}`}
          value={item.description}
          disabled={disabled}
          onChange={(e) => changeValue(item.value, e.target.value)}
        />
      </Grid>
    )
  };

  const paintElement = () => {
    return answers?.firstColumn?.map((item, index) =>
      <Grid item xs={12} key={item?.id}>
        <TextField
          fullWidth
          label={`Elemento ${index + 1}`}
          value={item.title}
          disabled={disabled}
          InputProps={{
            endAdornment: !disabled &&
              <DeleteIcon onClick={() => deleteAnswer(item.id)} sx={{cursor: 'pointer'}}/>
          }}
          onChange={(e) => handleChangeElement(item.id, e.target.value)}
        />
      </Grid>
    );
  };

  const deleteAnswer = (id) => {
    const firstColumn = answers.firstColumn.filter((item) => item.id !== id);
    setAnswer({
      ...answers,
      firstColumn
    });
  };

  return (
    <Grid container spacing={2} sx={{mt: 2}}>
      <Grid item xs={12}>
        <Typography>
          Escala de valoración
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label={'Número inicial'}
          value={min}
          type={'number'}
          disabled={disabled}
          inputProps={{
            min: 1,
            max: 9
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
            min: 2,
            max: 10
          }}
          onChange={(e) => handleMax(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid container item xs={12} spacing={1}>
        {
          paintInputs()
        }
      </Grid>
      <Grid item xs={12} sx={{mt: 2}}>
        <Typography>
          Elementos asociados
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={10} container spacing={1}>
        {
          paintElement()
        }
      </Grid>
      <Grid item xs={10}>
        <Button
          disabled={disabled}
          onClick={handleNewElement}
        >
          Añadir elemento
        </Button>
      </Grid>
    </Grid>
  );
}

Matrix.propTypes = {
  answers: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  setAnswer: PropTypes.func.isRequired,
};