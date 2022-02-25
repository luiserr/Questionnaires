import {Button, Grid} from "@mui/material";
import React from 'react';

export default function GoodBye({presentation}) {
  return (
    <Grid container sx={{mt: 2}}>
      <Grid item xs={12}>
        {
          presentation?.goodbye ?
            <div dangerouslySetInnerHTML={presentation?.goodbye}/>
            :
            <h4>Usted ha terminado esta encuesta!</h4>
        }
        <Button
          sx={{mt: 2}}
          variant={'contained'}
          color={'info'}
        >
          Clic para finalizar la encuesta
        </Button>
      </Grid>
    </Grid>
  );
}