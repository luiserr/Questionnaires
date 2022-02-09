import Grid from "@mui/material/Grid";
import React, {useState} from "react";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import * as PropTypes from 'prop-types';
import Question from "./Question";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import {saveAnswer} from "../../../tools/presentationRequest";
import validate from '../../../tools/validateAnswer';

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

export default function Section({presentation, section, setSection}) {

  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(section.questions[0] ?? {});
  // const [lastPage, setLastPage] = useState(page);

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
    if (!lastQuestion?.attempts?.save && validate(lastQuestion)) {
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
    setPage(newPage);
    setCurrentQuestion(questions[currentIndex]);
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
            <Tab label="Presentación" {...a11yProps(0)} />
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
                <Question
                  question={currentQuestion}
                  indexQuestion={page - 1}
                  setQuestion={setQuestion}
                />
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