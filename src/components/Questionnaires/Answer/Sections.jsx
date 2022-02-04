import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Section from "./Section";
import MobileStepper from "@mui/material/MobileStepper";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";

export default function Sections({presentation}) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const sections = presentation?.sections;
  const maxSteps = sections.length;

  return (
    <Box component={Paper} sx={{width: '100%', flexGrow: 1}}>
      <Paper
        square
        elevation={0}
        sx={{
          backgroundColor: '#9d9d9d',
          display: 'flex',
          alignItems: 'center',
          height: 50,
          textAlign: 'center',
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{sections[activeStep]?.title}</Typography>
      </Paper>
      <Box sx={{
        width: '100%', p: 2}}>
        <div style={{marginTop: '2en'}}>
          <Section section={sections[activeStep]}/>
        </div>
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft/>
            ) : (
              <KeyboardArrowRight/>
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight/>
            ) : (
              <KeyboardArrowLeft/>
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}
