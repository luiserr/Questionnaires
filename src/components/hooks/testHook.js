import {useEffect, useState} from "react";

import {findTest} from '../../tools/testRequests';

export const useTest = (testId, currentTest) => {
  const [test, setTest] = useState({});
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