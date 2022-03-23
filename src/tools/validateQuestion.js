import {toast} from "../utils/alerts";
import {BOOLEAN, MATRIX, MULTIPLE, NUMERIC, OPEN, SINGLE} from "../const/questionTypes";

const general = (question) => {
  if (question.description === '') {
    toast('Descripción de la pregunta es requerida', false);
    return false;
  }
  if (question.answers.length <= 0 && question.questionType !== OPEN) {
    toast('Es necesario configurar respuestas', false);
    return false;
  }
  return true;
};

const multiple = (answers = []) => {
  const failIndex = answers.findIndex((answer) => {
    return answer.description === '' || !answer.id;
  });
  if (failIndex >= 0) {
    toast(`La respuesta # ${failIndex + 1} necesita un valor`, false);
    return false;
  }
  return true;
};

const matrix = (answers) => {
  console.log(answers);
  if (!answers.firstColumn || !answers.secondColumn) {
    toast('Respuestas mal configuradas', false);
    return false;
  }
  if (answers.firstColumn.length <= 0 || answers.secondColumn.length <= 0) {
    toast('Respuestas mal configuradas', false);
    return false;
  }
  for (let i = 0; i < answers.firstColumn.length; i++) {
    if (answers.firstColumn[i]['title'] === '') {
      toast(`La fila ${i + 1} no tiene titulo`, false);
      return false
    }
  }
  for (let i = 0; i < answers.secondColumn.length; i++) {

    if (answers.secondColumn[i]['description'] === '') {
      toast(`La respuesta ${i + 1} no tiene descripción`, false);
      return false
    }
  }
  return true;
}

export default function validate(question) {
  if (general(question)) {
    if (question.questionType !== OPEN) {
      switch (question.questionType) {
        case MULTIPLE:
        case SINGLE:
        case BOOLEAN:
        case NUMERIC:
          return multiple(question.answers);
        case MATRIX:
          return matrix(question.answers);
        default:
          toast('Debe seleccionar un tipo de pregunta', false);
          return false;
      }
    }
    return true;
  }
  return false;
}