import {BOOLEAN, MATRIX, MULTIPLE, NUMERIC, OPEN, SINGLE} from "../const/questionTypes";
import {toast} from "../utils/alerts";

const multiple = (answers) => {
  return answers.length !== 0;
};

const open = (answers) => {
  return answers !== '';
};

const matrix = (answers) => {
  if (answers.length === 0) {
    return false;
  }
  for (let i = 0; i < answers.length; i++) {
    if (!answers[i]['questionId'] || !answers[i]['answerId']) {
      return false;
    }
  }
  return true;
};

export function validateAnswer(question) {
  switch (question.questionType) {
    case MULTIPLE:
    case SINGLE:
    case BOOLEAN:
    case NUMERIC:
      return multiple(question.attempts.answers ?? []);
    case OPEN:
      return open(question.attempts.answers ?? '');
    case MATRIX:
      return matrix(question.attempts.answers ?? []);
    default:
      toast('Tipo de pregunta invalido', false);
      return false;
  }
}

export function canPass(hasAnswer, question) {
  if (!hasAnswer) {
    if (question.validation === 'required') {
      toast('Esta pregunta es requerida', false);
      return false;
    } else if (question.validation === 'warning') {
      toast('No ha escogido ninguna respuesta', false, 'warning');
    }
  }
  return true;
}