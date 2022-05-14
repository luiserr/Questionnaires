import React from "react";
import {useQuestion} from "../../hooks/testHook";
import * as PropTypes from 'prop-types';
import {Alert, Box, Button} from "@mui/material";
import {finishPresentation, getPresentation} from "../../../tools/presentationRequest";
import {myAlert} from "../../../utils/alerts";

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
    canRender,
    presentation,
    setPresentation
  }) {

  const Question = useQuestion(question, setQuestion, indexQuestion, preview, readOnly);

  const handleNextSection = async () => {
    const save = await handleSave(indexQuestion);
    if (save) {
      handleNext();
    }
  };

  const handleAnswer = async () => {
    const save = await handleSave(indexQuestion);
    if (save) {
      await handleFinish();
    }
  };

  const handleFinish = async () => {
    const response = await finishPresentation();
    if (response) {
      const myPresentation = await getPresentation(sessionStorage.getItem('_token'));
      if (myPresentation) {
        myAlert('Encuesta finalizada con éxito', 'success');
        handleTab(2);
        return setPresentation(myPresentation);
      }
      myAlert('Error al actualizar los datos de la encuesta');
    }
    myAlert('No se pudo finalizar la encuesta');
  };

  // const canRender = hasDependency(presentation?.sections, question, presentation?.dependencies);

  return (
    <>
      {
        (canRender || preview) ?
          <>
            <Box sx={{marginTop: '2em'}}>
              <div dangerouslySetInnerHTML={{__html: question?.description}}/>
            </Box>
            <Box sx={{marginTop: '2em'}}>
              {Question}
            </Box>
          </> :
          <Alert color={'info'}>
            Esta pregunta depende de una respuesta seleccionada anteriormente, por favor puede continuar con la
            encuesta,
            no es necesario responder esta pregunta
          </Alert>
      }
      <Box sx={{mt: 1}}>
        {(isLast && !lastSection) &&
          <Button
            sx={{float: 'right'}}
            onClick={handleNextSection}
            color={'info'}
            variant={'outlined'}
          >Siguiente sección</Button>
        }
        {
          (isLast && lastSection && !readOnly && !preview) &&
          <Button variant={'outlined'} onClick={handleAnswer} sx={{float: 'right', mt: 2}}>Guardar respuesta y
            finalizar
          </Button>
        }
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