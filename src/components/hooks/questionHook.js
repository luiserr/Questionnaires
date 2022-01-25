import Multiple from "../tests/config/questions/Multiple";
import Single from "../tests/config/questions/Single";
import Boolean from "../tests/config/questions/Boolean";
import Matrix from "../tests/config/questions/Matrix";
import React from "react";

export default function useQuestion(questionType) {
  switch (questionType) {
    case 'multiple':
      return <Multiple/>;
    case 'single' :
      return <Single/>;
    case 'boolean' :
      return <Boolean/>;
    case 'matrix':
      return <Matrix/>;
    default:
      return '';
  }
}