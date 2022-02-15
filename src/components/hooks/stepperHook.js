import General from '../Questionnaires/config/General';
import SectionList from '../Questionnaires/config/SectionList';
import React from "react";
import Finish from "../Questionnaires/config/Finish";

export default (step, test, payload, setPayload) => {
  if (step === 0) {
    return <General payload={payload} setPayload={setPayload} test={test}/>
  }
  if (step === 1) {
    return <SectionList test={test}/>
  }
  if (step === 2) {
    return <Finish test={test}/>
  }
  return (<h1>El paso no existe</h1>)
};