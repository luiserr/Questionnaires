import {Box, Divider, Paper} from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import * as PropTypes from 'prop-types';
import {getPresentation, initPresentation, resetPresentation} from "../../../tools/presentationRequest";
import Typography from "@mui/material/Typography";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {myAlert} from "../../../utils/alerts";

export default function Info({presentation, setPresentation, preview, setValue}) {

  const handleInit = async () => {
    const payload = {
      presentationId: presentation.id,
      testId: presentation.testId,
      _token: sessionStorage.getItem('_token')
    };
    await initPresentation(payload);
    const myPresentation = await getPresentation(sessionStorage.getItem('_token'));
    if (myPresentation) {
      myAlert('Encuesta iniciada con éxito', 'success');
      setPresentation(myPresentation);
      setValue(1);
    }
  };

  const handleReset = async () => {
    await resetPresentation();
    const myPresentation = await getPresentation(sessionStorage.getItem('_token'));
    if (myPresentation) {
      myAlert('Encuesta reiniciada con éxito', 'success');
      setPresentation(myPresentation);
      return setValue(1);
    }
  }

  return (
    <>
      <Paper elevation={2} sx={{p: 3}}>
        <Typography variant={"h6"}>Encuesta: {presentation?.title}</Typography>
        <Divider/>
        <Box sx={{m:2}}>
        {!preview && <Typography>Número de intentos: {presentation?.tries}</Typography>}
        {!preview && <Typography>Número de intentos realizados: {presentation?.takeTries}</Typography>}
        </Box>
        <Typography variant={"h6"}>Descripción:</Typography>
        <Divider/>
        <Box sx={{height: '350px', marginTop: 3, padding: '2em', overflowY: 'scroll'}}>
          <div dangerouslySetInnerHTML={{__html: presentation?.description}}/>
        </Box>
        <div style={{marginTop: '2em'}}>
          {presentation?.actions?.init &&
            <Button
              variant="contained"
              color={'success'}
              onClick={() => handleInit()}
              startIcon={<PlayCircleFilledWhiteIcon/>}
            >
              Iniciar encuesta
            </Button>}
          {presentation?.actions?.reset && presentation?.tryId &&
            <Button
              color={'warning'}
              variant="contained"
              onClick={() => handleReset()}
              startIcon={<RestartAltIcon/>}
            >
              Reiniciar encuesta
            </Button>}
        </div>
      </Paper>
    </>
  );
}

Info.propTypes = {
  presentation: PropTypes.object,
  setPresentation: PropTypes.func,
};