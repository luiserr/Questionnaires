import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import * as PropTypes from 'prop-types';
import React from "react";

export default function Multiple({question, setQuestion}) {

  const handleChange = (id, checked) => {
    const answers = question?.attempts ?? [];
    if (checked) {
      answers.push(id)
    } else {
      answers.filter((answer) => answer !== id);
    }
    setQuestion({
      ...question,
      attempts: answers
    });
  };

  const isChecked = (id) => {
    return question?.attempts?.includes(id);
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
};