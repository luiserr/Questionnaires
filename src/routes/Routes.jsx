import {Route, Routes} from "react-router-dom";
import Configuration from "../pages/Questionnaires/Wizard";
import * as React from "react";
import TestList from '../pages/Questionnaires/TestList';
import Home from '../pages/Home';
import Section from '../pages/Questionnaires/Section';
import Question from "../pages/Questionnaires/Question";
import Answer from '../pages/answer/';
import QuestionBank from "../pages/Questionnaires/Bank/QuestionBank";
import ListAssign from "../pages/Questionnaires/ListAssign";
import Assign from "../pages/Questionnaires/Assign";

export default function routes() {
  return (
    <Routes>
      <Route exact name="list" path="/" element={<Home/>}>
        <Route exact name="create" path="/test" element={<TestList/>}/>
        <Route exact name="create" path="/test/:testId" element={<Configuration/>}/>
        <Route exact name="create" path="/test/presentation/:testId" element={<ListAssign/>}/>
        <Route exact name="create" path="/test/presentation/create" element={<Assign/>}/>
        <Route exact name="create" path="/test/:testId/section/:sectionId" element={<Section/>}/>
        <Route exact name="create" path="/test/:testId/section/:sectionId/question/:questionId" element={<Question/>}/>
        <Route exact name="create" path="/test/:testId/section/:sectionId/question/bank" element={<QuestionBank/>}/>
      </Route>
      <Route exact name="answer" path="/answer/test/:testId/presentation/:presentationId" element={<Answer/>}/>
      <Route exact path="*" element={<h1>No hay pagina</h1>}/>
    </Routes>
  );
}