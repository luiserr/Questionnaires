import React, {useState} from 'react';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import {useOperator} from "../../../hooks/dependencyHook";
import {v4} from "uuid";
import {addDependency} from "../../../../tools/testRequests";

export default function Dependency({question, testId, dependsOfSection, currentSection, currentQuestion}) {

  const operators = useOperator(question.type);

  const [operator, setOperator] = useState('');
  const [answer, setAnswer] = useState(null);

  const handleSave = async () => {
    const response = await addDependency(
      currentQuestion.id,
      currentSection,
      testId,
      dependsOfSection,
      question.id,
      operator,
      answer
    );
  }

  return (
    <Grid container spacing={2} sx={{mt: 2}}>
      <Grid item xs={5}>
        <FormControl fullWidth>
          <InputLabel id="operator">Sí la respuesta es</InputLabel>
          <Select
            labelId="operator"
            id="demo-simple-select"
            label="Operador"
            fullWidth
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
          >
            {
              operators.map((item) =>
                <MenuItem key={v4()} value={item}>
                  {item}
                </MenuItem>
              )
            }
          < /Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="operator">Seleccione la respuesta</InputLabel>
          <Select
            labelId="answer"
            id="demo-simple-select"
            label="Respuesta"
            fullWidth
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          >

            {
              question?.answers?.map((item) =>
                <MenuItem key={v4()} value={item.id}>{item.description}</MenuItem>
              )
            }
          < /Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant={'contained'} onClick={handleSave}>
          Guardar
        </Button>
      </Grid>
    </Grid>
  );
}