import {Route, Routes} from "react-router-dom";
import Configuration from "../pages/tests/Wizard";
import * as React from "react";
import TestList from '../pages/tests/TestList';
import Home from '../pages/Home';
import Section from '../pages/tests/Section';
import Question from "../pages/tests/Question";

export default function routes() {
  return (
    <Routes>
      <Route exact name="list" path="/" element={<Home/>}>
        <Route exact name="create" path="/" element={<TestList/>}/>
        <Route exact name="create" path="/test/:testId" element={<Configuration/>}/>
        <Route exact name="create" path="/test/presentacion/:testId" element={<Configuration/>}/>
        <Route exact name="create" path="/test/:testId/section/:sectionId" element={<Section/>}/>
        <Route exact name="create" path="/test/:testId/section/:sectionId/question/:questionId" element={<Question/>}/>
      </Route>
      <Route exact path="*" element={<h1>No hay pagina</h1>}/>
    </Routes>
  );
}