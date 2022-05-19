import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Header from './Header';
import Grid from "@mui/material/Grid";
import {usePresentation} from "../../components/hooks/testHook";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getPresentation} from "../../tools/presentationRequest";
import {myAlert} from "../../utils/alerts";
import {Alert, Button} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {ANSWERED, EXPIRED, IN_PROGRESS} from "../../const/statuses";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Answer() {
  const [value, setValue] = React.useState(0);
  const [presentation, setPresentation] = useState(null);

  const {token} = useParams();

  const location = useLocation();

  const navigate = useNavigate();

  const handleToken = (encodeToken) => {
    // const decodeToken = atob(token);
    sessionStorage.setItem('_token', encodeToken);
  }

  useEffect(async () => {
    if (!presentation) {
      const encodeToken = encodeURIComponent(token);
      const myPresentation = await getPresentation(encodeToken);
      if (!myPresentation) {
        setTimeout(() => {
          myAlert('Error al mostrar la información de la encuesta');
        }, 3000);
      } else {
        handleToken(encodeToken);
        setPresentation(myPresentation);
        if (myPresentation?.tryId && myPresentation?.statusTry === IN_PROGRESS) {
          setValue(1);
        }
      }
    }
  }, [presentation]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTab = (tab = 2) => {
    handleChange(null, tab);
  }

  const handleBack = () => {
    navigate(`/admin/surveys/test/${presentation?.id}`, {state: {step: 3, test: location?.state?.test}});
  }

  const TabPanel = usePresentation(presentation, setPresentation, value, handleTab, presentation?.preview, setValue);

  return (
    <>
      <Header/>
      {
        !presentation?.preview &&
        <Box sx={{width: '90%', margin: 'auto'}}>
          <Grid sx={{
            display: 'block',
            float: 'right',
            width: '400px',
            mt: 2,
            marginRight: '-100px',
          }}>
            {/*<Button*/}
            {/*  alt={'Ver consolidado de resultados'}*/}
            {/*  title={'Ver consolidado de resultados'}*/}
            {/*  onClick={() => navigate(`/admin/surveys/test/${presentation?.testId}/presentation/${presentation?.id}/average`)}*/}
            {/*  startIcon={<QueryStatsIcon/>}*/}
            {/*>*/}
            {/*  Ver consolidado de resultados*/}
            {/*</Button>*/}
          </Grid>
        </Box>
      }
      {
        presentation?.statusTry === EXPIRED ?
          <Alert color={'warning'}>
            Esta encuesta no está disponible
          </Alert> :
          presentation?.statusTry === ANSWERED ?
            <>
              <Alert color={'info'}>
                <h4>Estimado usuario, usted ya respondió esta encuesta, no cuenta con más intentos. Gracias por su
                  participación.</h4>
              </Alert>
              <div style={{margin: '8px auto', display: 'block', width: '60%'}}>
                <div style={{marginTop: '8px'}} dangerouslySetInnerHTML={{__html: presentation?.goodbye ?? ''}}>

                </div>
              </div>
            </>
            :
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
                  <Tabs value={value} onChange={handleChange} aria-label="Pasos para encuestas">
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
      }
    </>
  )
}
