import FormGroup from "@mui/material/FormGroup";
import * as PropTypes from 'prop-types';
import React from "react";
import FormControl from "@mui/material/FormControl";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";

export default function Single({question, setQuestion, indexQuestion, preview, readOnly}) {

  const change = (id) => {
    let answers = [id];
    setQuestion({
        ...question,
        attempts: {
          answers,
          save: false
        }
      },
      indexQuestion);
  };

  const myAnswer = question?.attempts?.answers[0] ?? null;

  const isChecked = (id) => {
    return myAnswer === id;
  };

  return (
    <FormGroup>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          {
            question?.answers?.map((answer) => {
              return (
                <FormControlLabel
                  key={answer.id}
                  disabled={preview || readOnly}
                  control={<Radio
                    disabled={preview || readOnly}
                    checked={isChecked(answer.id)} onChange={(e, checked) => change(answer.id)}/>}
                  label={answer?.description}/>
              )
            })
          }
        </RadioGroup>
      </FormControl>
    </FormGroup>
  );
}

Single.propTypes = {
  question: PropTypes.object,
  setQuestion: PropTypes.func.isRequired,
  indexQuestion: PropTypes.number,
};