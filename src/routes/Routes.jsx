import {Route, Routes} from "react-router-dom";
import Configuration from "../pages/Questionnaires/Wizard";
import * as React from "react";
import TestList from '../pages/Questionnaires/TestList';
import Home from '../pages/Home';
import Section from '../pages/Questionnaires/Section';
import Question from "../pages/Questionnaires/Question";
import Answer from '../pages/answer/';
import QuestionBank from "../pages/Questionnaires/Bank/QuestionBank";
import CreateAssign from "../pages/Assignments/create";
import CreateReport from "../pages/Reports/create";
import ListReports from "../pages/Reports/list";
import List from "../pages/Assignments/List";
import NotFound from "../pages/NotFound";
import Categories from "../pages/Questionnaires/Categories";
import Dependency from "../pages/Questionnaires/Dependency";
import QuestionAverage from "../pages/Reports/QuestionAverage";

export default function routes({token}) {
  return (
    <Routes>
      <Route exact name="list" path="/admin/surveys/" element={<Home token={token}/>}>
        <Route exact name="create" path="/admin/surveys/" element={<TestList/>}/>
        <Route
          exact
          name="create"
          path="/admin/surveys/test"
          element={<TestList/>}
        />
        <Route
          exact
          name="create"
          path="/admin/surveys/test/:testId"
          element={<Configuration/>}
        />
        {/*<Route exact name="create" path="/test/:testId/presentation/create" element={<Assign/>}/>*/}
        <Route
          exact
          name="create"
          path="/admin/surveys/test/:testId/presentation/:presentationId"
          element={<CreateAssign/>}/>
        <Route
          exact
          name="create"
          path="/admin/surveys/test/:testId/presentation/:presentationId/report"
          element={<CreateReport/>}/>
        <Route exact name="create" path="/admin/surveys/reports" element={<ListReports/>}/>
        <Route exact
               name="create"
               path="/admin/surveys/test/:testId/presentations" element={<List/>}/>
        <Route exact
               name="create"
               path="/admin/surveys/test/:testId/section/:sectionId" element={<Section/>}/>
        <Route exact
               name="create"
               path="/admin/surveys/test/:testId/section/:sectionId/question/:questionId"
               element={<Question/>}/>
        <Route exact
               name="create"
               path="/admin/surveys/test/:testId/section/:sectionId/question/:questionId/dependency"
               element={<Dependency/>}/>
        <Route exact
               name="create"
               path="/admin/surveys/test/:testId/section/:sectionId/question/bank"
               element={<QuestionBank/>}/>
        <Route
          exact
          name="create"
          path="/admin/surveys/categories"
          element={<Categories/>}/>
      </Route>
      <Route
        exact
        name="answer"
        path="/admin/surveys/answer/:token"
        element={<Answer/>}
      />
      <Route
        exact
        name="QuestionAverage"
        path="/admin/surveys/test/:testId/presentation/:presentationId/average"
        element={<QuestionAverage/>}
      />
      <Route
        exact
        path="*"
        element={<NotFound/>}
      />
    </Routes>
  );
}