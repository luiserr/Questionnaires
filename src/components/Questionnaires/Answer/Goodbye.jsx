import {Button, Grid, Paper} from "@mui/material";
import React from 'react';
import {finishPresentation, getPresentation} from "../../../tools/presentationRequest";
import {IN_PROGRESS} from "../../../const/statuses";
import {myAlert} from "../../../utils/alerts";

export default function GoodBye({presentation, setPresentation, preview}) {

  const handleFinish = async () => {
    const response = await finishPresentation();
    const myPresentation = await getPresentation(sessionStorage.getItem('_token'));
    if (myPresentation) {
      return setPresentation(myPresentation);
    }
    myAlert('Error al actualizar los datos de la encuesta');
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
              disabled={preview}
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