import React, {useEffect, useState} from "react";
import Info from '../Questionnaires/Answer/Info';
import Section from '../Questionnaires/Answer/Sections';
import {findTest} from '../../tools/testRequests';
import {MULTIPLE} from "../../const/questionTypes";
import Multiple from "../Questionnaires/Answer/Multiple";

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

export function useAnswer(presentation, setPresentation, index) {
  switch (index) {
    case 0:
      return <Info presentation={presentation} setPresentation={setPresentation}/>;
    case 1:
      return <Section presentation={presentation} setPresentation={setPresentation}/>;
    default:
      return <h1>Hola mundo</h1>
  }
}

export function useQuestion(question) {
  switch (question.questionType) {
    case MULTIPLE:
      return <Multiple question={question}/>;
    default:
      return '';
  }
}