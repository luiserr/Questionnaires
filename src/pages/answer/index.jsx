import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Header from './Header';
import Grid from "@mui/material/Grid";
import {useAnswer} from "../../components/hooks/testHook";
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {getPresentation, getQuestions} from "../../tools/presentationRequest";
import {IN_PROGRESS} from "../../const/statuses";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [presentation, setPresentation] = useState(null);

  const {testId, presentationId} = useParams();

  useEffect(async () => {
    if (!presentation) {
      const myPresentation = await getPresentation(testId, presentationId);
      setPresentation(myPresentation);
    }
  }, [presentation]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = useAnswer(presentation, setPresentation, value);

  return (
    <>
      <Header/>
      <Grid container>
        <Box sx={{width: '90%', margin: '0 auto', marginTop: '2em'}}>
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Presentación" {...a11yProps(0)} />
              <Tab label="Cuestionario" {...a11yProps(1)} disabled={!presentation?.sections}/>
              <Tab label="Despedida" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <Grid item xs={12}>
            <div style={{marginTop: '2em'}}>
              {TabPanel}
            </div>
          </Grid>
        </Box>
      </Grid>
    </>
  )

}
