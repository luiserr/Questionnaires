import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";

import {findTest} from '../../tools/testRequests';

export const useTest = () => {

  const params = useParams();
  const location = useLocation();
  const [test, setTest] = useState({});
  const [payload, setPayload] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  useEffect(async () => {
    const testNavigation = location?.state?.test;
    setActiveStep(location?.state?.step || activeStep);
    const testId = params.testId;
    if (testId !== '_' && !testNavigation) {
      const myTest = await findTest(testId);
      await setPayload(myTest);
      await setTest(myTest);
      window.description = myTest?.description;
    } else {
      if (testNavigation) {
        setTest({...testNavigation});
        setPayload({...testNavigation});
      }
    }
  }, [params.testId]);

  return {
    test,
    setTest,
    payload,
    setPayload,
    location,
    activeStep,
    setActiveStep
  }

};