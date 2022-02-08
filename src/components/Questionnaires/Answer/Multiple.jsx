import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import * as PropTypes from 'prop-types';
import React from "react";

export default function Multiple({question, setQuestion, indexQuestion}) {

  const handleChange = (id, checked) => {
    const answers = question?.attempts?.answers ?? [];
    if (checked) {
      answers.push(id)
    } else {
      answers.filter((answer) => answer !== id);
    }
    setQuestion({
        ...question,
        attempts: {
          answers,
          save: false
        }
      },
      indexQuestion);
  };

  const isChecked = (id) => {
    return question?.attempts?.answers?.includes(id);
  };

  return (
    <FormGroup>
      {
        question?.answers?.map((answer) => {
          return (
            <FormControlLabel
              key={answer.id}
              control={
                <Checkbox
                  checked={isChecked(answer.id)}
                  onChange={(e) => handleChange(answer.id, e.target.checked)}
                />
              }
              label={answer?.description}
            />
          );
        })
      }
    </FormGroup>
  );
}

Multiple.propTypes = {
  question: PropTypes.object,
  setQuestion: PropTypes.func.isRequired,
  indexQuestion: PropTypes.number,
};