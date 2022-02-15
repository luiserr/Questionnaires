import Multiple from "../Questionnaires/config/questions/Multiple";
import Boolean from "../Questionnaires/config/questions/Boolean";
import Matrix from "../Questionnaires/config/questions/Matrix";
import React from "react";
import {BOOLEAN, MATRIX, MULTIPLE, SINGLE} from "../../const/questionTypes";

export default function useQuestion(question, answers, setAnswer, disabled) {
  switch (question.questionType) {
    case MULTIPLE:
      return <Multiple question={question} answers={answers} setAnswer={setAnswer} disabled={disabled}/>;
    case SINGLE :
      return <Multiple question={question} answers={answers} setAnswer={setAnswer} disabled={disabled}/>;
    case BOOLEAN :
      return <Boolean question={question} answers={answers} setAnswer={setAnswer} disabled={disabled}/>;
    case MATRIX:
      return <Matrix question={question} answers={answers} setAnswer={setAnswer} disabled={disabled}/>;
    default:
      return '';
  }
}