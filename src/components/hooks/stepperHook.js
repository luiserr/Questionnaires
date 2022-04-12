import General from '../Questionnaires/config/General';
import SectionList from '../Questionnaires/config/SectionList';
import React from "react";
import Finish from "../Questionnaires/config/Finish";
import Categories from "../Questionnaires/config/Categories";

export default (step, test, payload, setPayload, setTest) => {
  if (step === 0) {
    return <General payload={payload} setPayload={setPayload} test={test}/>
  }
  if (step === 1) {
    return <Categories test={test} setTest={setTest}/>
  }
  if (step === 2) {
    return <SectionList test={test} setTest={setTest}/>
  }
  if (step === 3) {
    return <Finish test={test} setTest={setTest}/>
  }
  return (<h1>El paso no existe</h1>)
};