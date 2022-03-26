import {Box, Divider, Paper} from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import * as PropTypes from 'prop-types';
import {initPresentation, resetPresentation} from "../../../tools/presentationRequest";
import Typography from "@mui/material/Typography";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function Info({presentation, setPresentation, preview}) {

  const handleInit = async () => {
    const payload = {
      presentationId: presentation.id,
      testId: presentation.testId,
      _token: sessionStorage.getItem('_token')
    };
    const myPresentation = await initPresentation(payload);
    if (myPresentation) {
      setPresentation(myPresentation);
    }
  };

  const handleReset = async () => {
    const myPresentation = await resetPresentation();
    if (myPresentation) {
      setPresentation(myPresentation);
    }
  }

  return (
    <>
      <Paper elevation={2} sx={{p: 3}}>
        <Typography variant={"h6"}>Encuesta: {presentation?.title}</Typography>
        <Divider/>
        {!preview && <Typography>Número de intentos: {presentation?.tries}</Typography>}
        {!preview && <Typography>Número de intentos tomados: {presentation?.takeTries}</Typography>}
        <Box sx={{height: '350px', marginTop: '2em', padding: '2em', overflowY: 'scroll'}}>
          <div dangerouslySetInnerHTML={{__html: presentation?.description}}/>
        </Box>
        <div style={{marginTop: '2em'}}>
          {presentation?.actions?.init &&
            <Button
              variant="contained"
              color={'success'}
              onClick={() => handleInit()}
              startIcon={<PlayCircleFilledWhiteIcon />}
            >
              Iniciar encuesta
            </Button>}
          {presentation?.actions?.reset &&
            <Button
              color={'warning'}
              variant="contained"
              onClick={() => handleReset()}
              startIcon={<RestartAltIcon />}
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