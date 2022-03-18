import React from "react";
import {useQuestion} from "../../hooks/testHook";
import * as PropTypes from 'prop-types';
import {Alert, Box, Button} from "@mui/material";
import {hasDependency} from "../../../tools/dependencyValidator";

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
    readOnly,
    preview,
    presentation
  }) {

  const Question = useQuestion(question, setQuestion, indexQuestion, preview);

  const handleNextSection = async () => {
    await handleSave(indexQuestion);
    handleNext();
  };

  const handleAnswer = async () => {
    await handleSave(indexQuestion);
    handleTab()
  };

  const canRender = hasDependency(presentation?.sections, question, presentation?.dependencies);

  return (
    <>{
      canRender ?
        <>
          <Box sx={{marginTop: '2em'}}>
            <div dangerouslySetInnerHTML={{__html: question?.description}}/>
          </Box>
          <Box sx={{marginTop: '2em'}}>
            {Question}
          </Box>
          <Box sx={{mt: 1}}>
            {(!lastSection && !readOnly && !preview) &&
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
            {(lastSection && !readOnly && !preview) &&
              <Button variant={'outlined'} onClick={handleAnswer} sx={{float: 'right'}}>Guardar respuesta y
                finalizar</Button>}
          </Box>
        </> :
        <Alert color={'info'}>
          Puede saltar esta pregunta
        </Alert>
    }
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