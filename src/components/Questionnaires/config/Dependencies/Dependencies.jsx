import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from "@mui/material";
import {v4} from "uuid";
import QuestionList from "./QuestionList";

export default function Dependencies({dependencies, testId, currentSection, currentQuestion}) {
  return (
    <Grid item xs={12}>
      {dependencies.map((dependency) =>
        <Accordion key={v4()}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{dependency.title}</Typography>
            {
              currentSection === dependency.id &&
              <Typography sx={{color: 'text.secondary'}}>Dependencia esta enesta sección</Typography>
            }
          </AccordionSummary>
          <AccordionDetails>
            <QuestionList
              questions={dependency.questions}
              testId={testId}
              dependsOfSection={dependency.id}
              currentQuestion={currentQuestion}
              currentSection={currentSection}
            />
          </AccordionDetails>
        </Accordion>
      )}
    </Grid>
  );
};