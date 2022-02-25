import {Button, Grid, Paper} from "@mui/material";
import React from 'react';
import {finishPresentation} from "../../../tools/presentationRequest";
import {IN_PROGRESS} from "../../../const/statuses";

export default function GoodBye({presentation, setPresentation}) {

  const handleFinish = async () => {
    const response = await finishPresentation();
    setPresentation(response);
  };

  return (
    <Paper elevation={2} sx={{p: 3}}>
      <Grid container sx={{mt: 2}}>
        <Grid item xs={12}>
          {
            presentation?.goodbye ?
              <div dangerouslySetInnerHTML={{__html: presentation?.goodbye ?? ''}}/>
              :
              <h4>Usted ha terminado esta encuesta!</h4>
          }
          {presentation?.statusTry === IN_PROGRESS &&
            <Button
              sx={{mt: 2}}
              variant={'contained'}
              color={'info'}
              onClick={handleFinish}
            >
              Clic para finalizar la encuesta
            </Button>}
        </Grid>
      </Grid>
    </Paper>
  );
}