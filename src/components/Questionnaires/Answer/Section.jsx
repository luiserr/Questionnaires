import Grid from "@mui/material/Grid";
import React, {useEffect, useState} from "react";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import * as PropTypes from 'prop-types';
import Question from "./Question";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import {saveAnswer} from "../../../tools/presentationRequest";
import {canPass, validateAnswer} from '../../../tools/validateAnswer';
import {CircularProgress} from "@mui/material";
import {FINISHED} from "../../../const/statuses";
import {hasDependency} from "../../../tools/dependencyValidator";

const SectionInfo = ({title, description}) => {
  return (
    <>
      <Box sx={{minHeight: '300px'}}>
        <div dangerouslySetInnerHTML={{__html: description}}/>
      </Box>
    </>
  );
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Section({presentation, section, setSection, activeSection, handleNext, handleTab, preview}) {

  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(section.questions[0] ?? {});
  const [loading, setLoading] = useState(false);

  const readOnly = presentation?.statusTry === FINISHED

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  }, [page]);

  const canRender = hasDependency(presentation?.sections, currentQuestion, presentation?.dependencies);

  const handleTabs = (e, value) => {
    setTab(value);
  };

  const setQuestion = (newQuestion, index) => {
    const questions = section.questions;
    questions[index] = {...newQuestion};
    setCurrentQuestion({...newQuestion});
    setSection({
      ...section,
      questions
    });
  };

  const handleChange = async (newPage) => {
    const currentIndex = newPage - 1;
    const lastIndex = page - 1;
    const questions = section?.questions;
    const lastQuestion = questions[lastIndex];
    const myCurrentQuestion = questions[currentIndex];
    if (readOnly) {
      setPage(newPage);
      setCurrentQuestion(myCurrentQuestion);
      return true;
    } else {
      const hasAnswer = validateAnswer(lastQuestion);
      if (
        !preview
        && !lastQuestion?.attempts?.save
        && hasAnswer
        && !readOnly
      ) {
        const newQuestion = await saveAnswer(
          presentation.testId,
          presentation.id,
          presentation.tryId,
          lastQuestion?.id,
          section.id,
          lastQuestion?.attempts?.answers
        )
        if (newQuestion) {
          setQuestion(newQuestion, lastIndex);
        }
      }
      if (canPass(hasAnswer, lastQuestion, preview, canRender)) {
        setPage(newPage);
        setCurrentQuestion({...myCurrentQuestion});
        return true;
      }
      return false;
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          component={Paper}
          sx={{flexGrow: 1, bgcolor: '#eee', display: 'flex', minHeight: '350px', padding: '15px'}}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tab}
            onChange={handleTabs}
            aria-label="Vertical tabs example"
            sx={{borderRight: 1, borderColor: 'divider'}}
          >
            <Tab label="Descripción" {...a11yProps(0)} />
            <Tab label="Preguntas" {...a11yProps(1)} />
          </Tabs>
          <Box sx={{width: '85%', margin: '0 auto'}}>
            {tab === 0 ?
              <SectionInfo description={section?.description} title={section?.title}/> :
              <>
                <Pagination
                  count={section?.questions?.length}
                  page={page}
                  onChange={(e, newPage) => handleChange(newPage)}
                />
                {
                  loading ? <CircularProgress/> :
                    <Question
                      readOnly={readOnly}
                      question={currentQuestion}
                      indexQuestion={page - 1}
                      setQuestion={setQuestion}
                      isLast={page === section.questions.length}
                      lastSection={activeSection === presentation?.sections?.length - 1}
                      handleSave={handleChange}
                      handleNext={handleNext}
                      handleTab={handleTab}
                      preview={preview}
                      canRender={canRender}
                      presentation={presentation}
                    />
                }
              </>
            }
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

Section.propTypes = {
  section: PropTypes.object,
  setSection: PropTypes.func.isRequired,
  presentation: PropTypes.object,
};
