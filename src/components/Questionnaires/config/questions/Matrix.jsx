import React, {useEffect} from "react";
import {v4 as uuid} from "uuid";
import Box from "@mui/material/Box";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';


export default function Matrix({answers, question, setAnswer}) {

  useEffect(() => {
    const formate = formatAnswers();
    setAnswer(formate);
  }, [question.answers]);

  const {firstColumn = [], secondColumn = []} = answers;

  const formatAnswers = () => {
    let myFirstColumn = [];
    let mySecondColumn = [];
    if (answers.length > 0) {
      myFirstColumn = answers.map((answer) => {
        return {
          'id': answer.id,
          title: answer.title
        }
      });
      mySecondColumn = (answers[0]['answers'] ?? []).map((answer) => {
        return {
          'id': answer.id,
          'description': answer.description
        }
      });
    }
    return {
      firstColumn: myFirstColumn,
      secondColumn: mySecondColumn
    }
  };


  const handleNewAnswer = ({answers}) => {
    const newAnswer = {
      description: '',
      id: uuid()
    };
    const newQuestion = {
      description: '',
      id: uuid()
    };
    setAnswer({
      firstColumn: [...firstColumn, newQuestion],
      secondColumn: [...secondColumn, newAnswer]
    });
  };

  const handleChange = (index, column, key, value) => {
    setAnswer(
      answers[column].map((answer, i) => {
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

  const deleteAnswer = (index) => {
    const newFirstColumn = [...firstColumn.slice(0, index), ...firstColumn.slice(index + 1, firstColumn.length)];
    const newSecondColumn = [...secondColumn.slice(0, index), ...secondColumn.slice(index + 1, secondColumn.length)];
    setAnswer({
      firstColumn: newFirstColumn,
      secondColumn: newSecondColumn
    });
  };


  return (
    <Box component={Paper}>
      <Grid item xs={12} sx={{marginTop: '2em', padding: '10px'}}>
        <h4>Configurar respuestas</h4>
        <Divider/>
        <br/>
        <Grid item xs={6}>
          {firstColumn?.map((question, index) => {
            console.log(secondColumn[index]);
            return (
              <>
                <Grid container sx={{marginTop: '1em'}}>
                  <Grid sx={{marginLeft: '1em'}} key={question.id} item xs={4}>
                    <TextField
                      key={question.id || uuid()}
                      label={`Pregunta: ${index + 1}:`}
                      onChange={e => handleChange(index, 'firstColumn', 'title', e.target.value)}
                      variant="outlined"
                      value={question?.title || ''}
                      fullWidth
                    />
                  </Grid>
                  <Grid sx={{marginLeft: '1em'}} key={uuid()} item xs={4}>
                    <TextField
                      key={uuid()}
                      label={`Respuesta ${index + 1}:`}
                      onChange={e => handleChange(index, 'secondColumn', 'description', e.target.value)}
                      variant="outlined"
                      value={secondColumn[index]?.description || ''}
                      fullWidth
                    />
                  </Grid>
                  <Grid sx={{marginLeft: '1em'}} key={uuid()} item xs={2}>
                    <Button
                      startIcon={<DeleteIcon/>}
                      onClick={() => deleteAnswer(index)}
                    >
                    </Button>
                  </Grid>
                </Grid>
              </>
            );
          })
          }
        </Grid>
        <Button sx={{marginTop: '1.5em'}} variant="outlined" onClick={handleNewAnswer}>
          Nueva respuesta
        </Button>
      </Grid>
    </Box>
  );
};