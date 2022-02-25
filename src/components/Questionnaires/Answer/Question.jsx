import React from "react";
import {useQuestion} from "../../hooks/testHook";
import * as PropTypes from 'prop-types';
import {Box, Button} from "@mui/material";

export default function Question(
  {
    question,
    setQuestion,
    indexQuestion,
    isLast = false,
    lastSection,
    handleNext,
    handleSave,
    handleTab,
    readOnly
  }) {

  const Question = useQuestion(question, setQuestion, indexQuestion);

  const handleNextSection = async () => {
    await handleSave(indexQuestion);
    handleNext();
  };

  const handleAnswer = async () => {
    await handleSave(indexQuestion);
    handleTab()
  };

  return (
    <>
      <Box sx={{marginTop: '2em'}}>
        <div dangerouslySetInnerHTML={{__html: question.description}}/>
      </Box>
      <Box sx={{marginTop: '2em'}}>
        {Question}
      </Box>
      <Box sx={{mt: 1}}>
        {(!lastSection && !readOnly) &&
          <Button
            sx={{float: 'left'}}
            onClick={() => handleSave(indexQuestion + 1)}
            variant={"outlined"}
            color={'success'}
          >Guardar respuesta
          </Button>
        }
        {(isLast && !lastSection) &&
          <Button
            sx={{float: 'right'}}
            onClick={handleNextSection}
            color={'info'}
            variant={'outlined'}
          >Siguiente sección</Button>}
        {(lastSection && !readOnly) && <Button variant={'outlined'} onClick={handleAnswer} sx={{float: 'right'}}>Guardar respuesta y
          finalizar</Button>}
      </Box>
    </>
  );
}

Question.propTypes = {
  question: PropTypes.object,
  setQuestion: PropTypes.func.isRequired,
  indexQuestion: PropTypes.number,
  isLast: PropTypes.bool,
  readOnly: PropTypes.bool,
};