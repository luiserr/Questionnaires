import Grid from "@mui/material/Grid";
import React, {useEffect, useState} from "react";
import Pagination from "@mui/material/Pagination";
import {Paper} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as PropTypes from 'prop-types';
import Question from "./Question";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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

export default function Section({section}) {

  const [currentQuestion, setCurrentQuestion] = useState({});
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);

  const handleTabs = (e, value) => {
    setTab(value);
  };

  useEffect(() => {
    handleChange(page);
  }, []);


  const handleChange = (newPage) => {
    // newPage = newPage - 1;
    const questions = section?.questions;
    setPage(newPage);
    setCurrentQuestion(questions[newPage-1]);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex', minHeight: '350px'}}>
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
              <SectionInfo description={section.description} title={section.title}/> :
              <>
                <Pagination
                  count={section?.questions?.length}
                  page={page}
                  onChange={(e, newPage) => handleChange(newPage)}
                />
                <Question question={currentQuestion}/>
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
};
