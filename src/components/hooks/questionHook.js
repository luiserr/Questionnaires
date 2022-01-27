import Multiple from "../Questionnaires/config/questions/Multiple";
import Single from "../Questionnaires/config/questions/Single";
import Boolean from "../Questionnaires/config/questions/Boolean";
import Matrix from "../Questionnaires/config/questions/Matrix";
import React from "react";
import {BOOLEAN, MATRIX, MULTIPLE, SINGLE} from "../../const/questionTypes";

export default function useQuestion(question, answers, setAnswer) {
  switch (question.questionType) {
    case MULTIPLE:
      return <Multiple answers={answers} setAnswer={setAnswer}/>;
    case SINGLE :
      return <Single answers={answers} setAnswer={setAnswer}/>;
    case BOOLEAN :
      return <Boolean answers={answers} setAnswer={setAnswer}/>;
    case MATRIX:
      return <Matrix answers={answers} setAnswer={setAnswer}/>;
    default:
      return '';
  }
}