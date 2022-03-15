import React, {useEffect, useState} from "react";
import Info from '../Questionnaires/Answer/Info';
import Sections from '../Questionnaires/Answer/Sections';
import {findTest} from '../../tools/testRequests';
import {BOOLEAN, MATRIX, MULTIPLE, NUMERIC, OPEN, SINGLE} from "../../const/questionTypes";
import Multiple from "../Questionnaires/Answer/Multiple";
import Boolean from "../Questionnaires/Answer/Boolean";
import Single from "../Questionnaires/Answer/Single";
import Matrix from "../Questionnaires/Answer/Matrix";
import Open from "../Questionnaires/Answer/Open";
import GoodBye from "../Questionnaires/Answer/Goodbye";

export const useTest = (testId, currentTest, user) => {
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

  const disabled = (parseInt(test?.presentations) > 0 || !user?.actions?.create) ?? true;

  return {
    test,
    setTest,
    disabled
  }
};

export function usePresentation(presentation, setPresentation, index, handleTab, preview) {
  switch (index) {
    case 0:
      return <Info presentation={presentation} setPresentation={setPresentation}/>;
    case 1:
      return <Sections presentation={presentation} setPresentation={setPresentation} handleTab={handleTab} preview={preview}/>;
    case 2:
      return <GoodBye presentation={presentation} setPresentation={setPresentation} handleTab={handleTab} preview={preview}/>;
    default:
      return <h1>Hola mundo</h1>
  }
}

export function useQuestion(question, setQuestion, indexQuestion, preview) {
  switch (question?.questionType) {
    case MULTIPLE:
      return <Multiple question={question} setQuestion={setQuestion} indexQuestion={indexQuestion} preview={preview}/>;
    case BOOLEAN:
      return <Boolean question={question} setQuestion={setQuestion} indexQuestion={indexQuestion} preview={preview}/>;
    case SINGLE:
    case NUMERIC:
      return <Single question={question} setQuestion={setQuestion} indexQuestion={indexQuestion} preview={preview}/>;
    case MATRIX:
      return <Matrix question={question} setQuestion={setQuestion} indexQuestion={indexQuestion} preview={preview}/>;
    case OPEN:
      return <Open question={question} setQuestion={setQuestion} indexQuestion={indexQuestion} preview={preview}/>;
    default:
      return '';
  }
}