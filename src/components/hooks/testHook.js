import React, {useEffect, useState} from "react";
import Info from '../Questionnaires/Answer/Info';
import Sections from '../Questionnaires/Answer/Sections';
import {findTest} from '../../tools/testRequests';
import {BOOLEAN, MULTIPLE, SINGLE} from "../../const/questionTypes";
import Multiple from "../Questionnaires/Answer/Multiple";
import Boolean from "../Questionnaires/Answer/Boolean";
import Single from "../Questionnaires/Answer/Single";

export const useTest = (testId, currentTest) => {
  const [test, setTest] = useState(null);
  useEffect(async () => {
    if (testId !== '_' && !currentTest) {
      const myTest = await findTest(testId);
      await setTest(myTest);
    } else {
      if (currentTest) {
        setTest({...currentTest});
      }
    }
  }, [testId]);

  return {
    test,
    setTest
  }
};

export function usePresentation(presentation, setPresentation, index) {
  switch (index) {
    case 0:
      return <Info presentation={presentation} setPresentation={setPresentation}/>;
    case 1:
      return <Sections presentation={presentation} setPresentation={setPresentation}/>;
    default:
      return <h1>Hola mundo</h1>
  }
}

export function useQuestion(question, setQuestion, indexQuestion) {
  switch (question.questionType) {
    case MULTIPLE:
      return <Multiple question={question} setQuestion={setQuestion} indexQuestion={indexQuestion}/>;
    case BOOLEAN:
      return <Boolean question={question} setQuestion={setQuestion} indexQuestion={indexQuestion}/>;
    case SINGLE:
      return <Single question={question} setQuestion={setQuestion} indexQuestion={indexQuestion}/>;
    default:
      return '';
  }
}