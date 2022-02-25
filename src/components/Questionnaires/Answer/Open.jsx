import React, {useState} from "react";
import {Grid, TextField} from "@mui/material";

export default function Open({question, setQuestion, indexQuestion}) {

  const [answer, setAnswer] = useState(question?.attempts?.answers ?? '');

  const handleChange = (answers) => {
    setAnswer(answers);
    setQuestion({
        ...question,
        attempts: {
          answers,
          save: false
        }
      },
      indexQuestion);
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <TextField
          value={answer}
          multiline
          rows={3}
          fullWidth
          onChange={(e) => handleChange(e.target.value)}
        />
      </Grid>
    </Grid>
  );
}