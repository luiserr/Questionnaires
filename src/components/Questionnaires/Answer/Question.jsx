import Box from "@mui/material/Box";
import React from "react";
import {useQuestion} from "../../hooks/testHook";
import * as PropTypes from 'prop-types';

export default function Question({question, setQuestion, indexQuestion}) {

  const Question = useQuestion(question, setQuestion, indexQuestion);

  return (
    <>
      <Box sx={{marginTop: '2em'}}>
        <div dangerouslySetInnerHTML={{__html: question.description}}/>
      </Box>
      <Box sx={{marginTop: '2em'}}>
        {Question}
      </Box>
    </>
  );
}

Question.propTypes = {
  question: PropTypes.object,
  setQuestion: PropTypes.func.isRequired,
  indexQuestion: PropTypes.number,
};