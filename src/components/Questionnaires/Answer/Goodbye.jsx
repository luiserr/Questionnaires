import {Button, Grid, Paper} from "@mui/material";
import React from 'react';
import {finishPresentation, getPresentation} from "../../../tools/presentationRequest";
import {FINISHED} from "../../../const/statuses";
import {myAlert} from "../../../utils/alerts";

export default function GoodBye({presentation, setPresentation, preview}) {

  const handleFinish = async () => {
    const response = await finishPresentation();
    if (response) {
      const myPresentation = await getPresentation(sessionStorage.getItem('_token'));
      if (myPresentation) {
        myAlert('Encuesta finalizada con éxito', 'success');
        return setPresentation(myPresentation);
      }
      myAlert('Error al actualizar los datos de la encuesta');
    }
    myAlert('No se pudo finalizar la encuesta');
  };

  function closeWindow() {
    window.open('', '_self').close();
    return false;
  }

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
          {(presentation?.statusTry !== FINISHED && presentation?.tryId) &&
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