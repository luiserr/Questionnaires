import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import React, {useState} from "react";

export default function Multiple({question}) {
  const [answers, setAnswers] = useState([]);

  return (
    <FormGroup>
      {
        question?.answers?.map((answer) => {
          return (
            <FormControlLabel
              key={answer.id}
              control={<Checkbox />}
              label={answer?.description}
            />
          );
        })
      }
    </FormGroup>
  );
}