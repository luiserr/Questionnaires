import {Box, Divider, Paper} from "@mui/material";
import React, {useEffect} from "react";
import Button from "@mui/material/Button";
import * as PropTypes from 'prop-types';
import {getQuestions, initPresentation} from "../../../tools/presentationRequest";
import Typography from "@mui/material/Typography";

export default function Info({presentation, setPresentation}) {

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

  return (
    <>
      <Typography variant={"h4"}>Titulo: {presentation?.title}</Typography>
      <Divider/>
      <Box sx={{minHeight: '200px', marginTop: '2em', padding: '2em'}}>
        <div dangerouslySetInnerHTML={{__html: presentation?.description}}/>
      </Box>
      <div style={{marginTop: '2em'}}>
        {presentation?.actions?.init &&
        <Button
          variant="contained"
          onClick={() => handleInit()}
        >
          Iniciar prueba
        </Button>}
      </div>
    </>
  );
}

Info.propTypes = {
  presentation: PropTypes.object,
  setPresentation: PropTypes.func,
};