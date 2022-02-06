import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material/styles';
import Section from "./Section";
import MobileStepper from "@mui/material/MobileStepper";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {useState} from "react";

export default function Sections({presentation, setPresentation}) {
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState(0);
  // const [sections, setSections] = useState(presentation?.sections || []);

  const handleNext = () => {
    setActiveSection((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveSection((prevActiveStep) => prevActiveStep - 1);
  };

  const changeSection = (newSection) => {
    const mySections = presentation?.sections;
    mySections[activeSection] = {...newSection};
    setPresentation({
      ...presentation,
      sections: mySections
    });
  };

  const sections = presentation?.sections ?? [];
  const maxSteps = sections?.length ?? 0;
  const currentSection = sections[activeSection];

  return (
    <Paper elevation={3} sx={{width: '100%', flexGrow: 1}}>
      <Paper
        square
        elevation={1}
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
        <Typography>{sections[activeSection]?.title}</Typography>
      </Paper>
      <Box sx={{
        width: '100%', p: 2
      }}>
        <div style={{marginTop: '2en'}}>
          {currentSection && <Section
            section={currentSection}
            setSection={changeSection}
          />}
        </div>
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeSection}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeSection === maxSteps - 1}
          >
            Siguiente sección
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft/>
            ) : (
              <KeyboardArrowRight/>
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeSection === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight/>
            ) : (
              <KeyboardArrowLeft/>
            )}
            Sección anterior
          </Button>
        }
      />
    </Paper>
  );
}
