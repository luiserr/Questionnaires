import {toast} from "../utils/alerts";
import {BOOLEAN, MULTIPLE, OPEN, SINGLE} from "../const/questionTypes";

const general = (question) => {
  if (question.description === '') {
    toast('Descripción de la pregunta es requerido', false);
    return false;
  }
  if (question.answers.length <= 0 && question.questionType !== OPEN) {
    toast('Es necesario configurar respuestas');
    return false;
  }
  return true;
};

const multiple = (answers = []) => {
  const failIndex = answers.findIndex((answer) => {
    return answer.description === '' || !answer.id;
  });
  if (failIndex >= 0) {
    toast(`La respuesta # ${failIndex + 1} necesita un valor`);
    return false;
  }
  return true;
};

export default function validate(question) {
  if (general(question)) {
    switch (question.questionType) {
      case MULTIPLE:
      case SINGLE:
      case BOOLEAN:
        return multiple(question.answers);
      default:
        toast('Tipo de pregunta invalido', false);
        return false;
    }
  }
  return false;
}