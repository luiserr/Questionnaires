import Info from '../Questionnaires/Answer/Info';
import Section from '../Questionnaires/Answer/Sections';

import React, {useEffect, useState} from "react";

import {findTest} from '../../tools/testRequests';

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

export function useAnswer(presentation, index) {
  switch (index) {
    case 0:
      return <Info presentation={presentation}/>;
    case 1:
      return <Section presentation={presentation}/>;
    default:
      return <h1>Hola mundo</h1>
  }
}