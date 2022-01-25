import Multiple from "../Questionnaires/config/questions/Multiple";
import Single from "../Questionnaires/config/questions/Single";
import Boolean from "../Questionnaires/config/questions/Boolean";
import Matrix from "../Questionnaires/config/questions/Matrix";
import React from "react";

export default function useQuestion(question, answers, setAnswer) {
  switch (question.questionType) {
    case 'multiple':
      return <Multiple answers={answers} setAnswer={setAnswer} />;
    case 'single' :
      return <Single answers={answers} setAnswer={setAnswer}/>;
    case 'boolean' :
      return <Boolean answers={answers} setAnswer={setAnswer}/>;
    case 'matrix':
      return <Matrix answers={answers} setAnswer={setAnswer}/>;
    default:
      return '';
  }
}