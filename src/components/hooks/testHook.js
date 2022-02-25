import React, {useEffect, useState} from "react";
import Info from '../Questionnaires/Answer/Info';
import Sections from '../Questionnaires/Answer/Sections';
import {findTest} from '../../tools/testRequests';
import {BOOLEAN, MATRIX, MULTIPLE, OPEN, SINGLE} from "../../const/questionTypes";
import Multiple from "../Questionnaires/Answer/Multiple";
import Boolean from "../Questionnaires/Answer/Boolean";
import Single from "../Questionnaires/Answer/Single";
import Matrix from "../Questionnaires/Answer/Matrix";
import Open from "../Questionnaires/Answer/Open";
import GoodBye from "../Questionnaires/Answer/Goodbye";

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

  const disabled = parseInt(test?.presentations) > 0 ?? true;

  return {
    test,
    setTest,
    disabled
  }
};

export function usePresentation(presentation, setPresentation, index, handleTab) {
  switch (index) {
    case 0:
      return <Info presentation={presentation} setPresentation={setPresentation}/>;
    case 1:
      return <Sections presentation={presentation} setPresentation={setPresentation} handleTab={handleTab}/>;
    case 2:
      return <GoodBye presentation={presentation} setPresentation={setPresentation} handleTab={handleTab}/>;
    default:
      return <h1>Hola mundo</h1>
  }
}

export function useQuestion(question, setQuestion, indexQuestion) {
  switch (question?.questionType) {
    case MULTIPLE:
      return <Multiple question={question} setQuestion={setQuestion} indexQuestion={indexQuestion}/>;
    case BOOLEAN:
      return <Boolean question={question} setQuestion={setQuestion} indexQuestion={indexQuestion}/>;
    case SINGLE:
      return <Single question={question} setQuestion={setQuestion} indexQuestion={indexQuestion}/>;
    case MATRIX:
      return <Matrix question={question} setQuestion={setQuestion} indexQuestion={indexQuestion}/>;
    case OPEN:
      return <Open question={question} setQuestion={setQuestion} indexQuestion={indexQuestion}/>;
    default:
      return '';
  }
}