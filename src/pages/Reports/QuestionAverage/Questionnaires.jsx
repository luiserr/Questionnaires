import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Divider,
  Grid,
  Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MyCircularProgress from "../../../components/commons/MyCircularProgress";


const Questionnaires = ({average}) => {
  return (
    <>
      {
        average.map(section =>
          <Accordion key={section.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{section?.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {
                  section?.questions?.map(question =>
                    <div className={'questions'} key={question?.id}>
                      <Typography>{question?.name}</Typography>
                      <Grid item xs={12}>
                        {
                          question?.answers?.map(answer =>
                            <div className={'showQuestions'} key={answer.id}>
                              <span>{answer?.name}</span> <MyCircularProgress value={answer?.average}/>
                            </div>
                          )
                        }
                      </Grid>
                    </div>
                  )
                }
            </AccordionDetails>
          </Accordion>
        )
      }
    </>
  );
}

export default Questionnaires;