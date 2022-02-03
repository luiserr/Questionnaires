import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function Sections({presentation, setPresentation}) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const sections = presentation?.sections ?? [];

  return (
    <Box sx={{maxWidth: 400}}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {sections.map((section, index) => (
          <Step key={section.id}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {section.title}
            </StepLabel>
            <StepContent>
              <div dangerouslySetInnerHTML={{__html: section.description}}>

              </div>
              <Box sx={{mb: 2}}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{mt: 1, mr: 1}}
                  >
                    {index === sections.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{mt: 1, mr: 1}}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === sections.length && (
        <Paper square elevation={0} sx={{p: 3}}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{mt: 1, mr: 1}}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
