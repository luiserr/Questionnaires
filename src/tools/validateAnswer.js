import {BOOLEAN, MULTIPLE, OPEN, SINGLE} from "../const/questionTypes";
import {toast} from "../utils/alerts";

const multiple = (answers) => {
  if (answers.length === 0) {
    toast('Error!, no ha seleccionado respuesta', false);
    return false;
  }
  return true;
};

const open = (answers) => {
  if (answers === '') {
    toast('Error, la respuesta esta vacia', false);
    return false;
  }
  return true;
};

export default function validate(question) {
  switch (question.questionType) {
    case MULTIPLE:
    case SINGLE:
    case BOOLEAN:
      return multiple(question.attempts.answers);
    case OPEN:
      return open(question.attempts.answers);
    default:
      toast('Tipo de pregunta invalido', false);
      return false;
  }
}