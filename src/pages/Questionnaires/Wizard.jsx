import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import General from '../../components/Questionnaires/config/General';
import Grid from "@mui/material/Grid";
import useStepper from '../../components/hooks/stepperHook';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {handleSave} from '../../tools/testRequests';
import {useTest} from "../../components/hooks/testHooks";
import {useNavigate} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";

const steps = ['General', 'Secciones', 'Despedida'];

export default function Wizard(props) {

  const {
    payload,
    test,
    setPayload,
    activeStep,
    setActiveStep,
    setTest
  } = useTest();

  const navigation = useNavigate();

  const Component = useStepper(activeStep, test, payload, setPayload);

  const handleBackHistory = () => {
    navigation('/test');
  };

  const handleNext = () => {
    handleSave(activeStep, test, payload, setTest, setActiveStep, navigation);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{width: '100%'}}>
      <h4>Configuración de cuestionarios</h4>
      <Card>
        <CardContent>
          <Button
            onClick={handleBackHistory}
            startIcon={<ArrowBack/>}
            sx={{float: 'right'}}
          >
            Atrás
          </Button>

          <Stepper sx={{marginTop: '2em'}} activeStep={activeStep} orientation="horizontal">
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography sx={{mt: 2, mb: 1}}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                <Box sx={{flex: '1 1 auto'}}/>
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2} sx={{paddingTop: '3em'}}>
                  {Component}
                </Grid>
              </Box>
              {/*Aquí van los botones*/}
              <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{mr: 1}}
                >
                  Anterior
                </Button>
                <Box sx={{flex: '1 1 auto'}}/>
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
