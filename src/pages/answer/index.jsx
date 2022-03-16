import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Header from './Header';
import Grid from "@mui/material/Grid";
import {usePresentation} from "../../components/hooks/testHook";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getPresentation} from "../../tools/presentationRequest";
import {myAlert} from "../../utils/alerts";
import {Button} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [presentation, setPresentation] = useState(null);

  const {token} = useParams();

  const navigate = useNavigate();

  const handleToken = (decodeToken) => {
    // const decodeToken = atob(token);
    sessionStorage.setItem('_token', decodeToken);
  }

  useEffect(async () => {
    if (!presentation) {
      const myPresentation = await getPresentation(token);
      if (!myPresentation) {
        setTimeout(() => {
          myAlert('Error al mostrar la información de la encuesta');
        }, 3000);
      } else {
        handleToken(token);
        setPresentation(myPresentation);
      }
    }
  }, [presentation]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTab = () => {
    handleChange(null, 2);
  }

  const handleBack = () => {
    navigate(`/admin/surveys/test/${presentation?.id}`, {state: {step: 3}});
  }

  const TabPanel = usePresentation(presentation, setPresentation, value, handleTab, presentation?.preview);

  return (
    <>
      <Header/>
      <Grid container>
        <Box sx={{width: '90%', margin: '0 auto', marginTop: '2em'}}>
          {presentation?.preview && <Button
            startIcon={<ArrowBackIcon/>}
            sx={{float: 'right'}}
            onClick={handleBack}
          >
            Regresar
          </Button>}
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Presentación" {...a11yProps(0)} />
              <Tab label="Preguntas" {...a11yProps(1)} disabled={!presentation?.sections}/>
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
