import General from '../tests/config/General';
import SectionList from '../tests/config/SectionList';
import React from "react";

export default (step, test, payload, setPayload) => {
  if (step === 0) {
    return <General payload={payload} setPayload={setPayload} test={test}/>
  }
  if (step === 1) {
    return <SectionList test={test}/>
  }
  return (<h1>Joder</h1>)
};