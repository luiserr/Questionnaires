import {Button, Grid} from "@mui/material";
import JoditEditor from "jodit-react";
import React, {useContext, useRef, useState} from "react";
import {finishTest, general, preview} from "../../../tools/testRequests";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "../../../utils/alerts";
import userContext from "../../../context/userContext";

export default function Finish({test, setTest}) {

  const location = useLocation();

  let goodbye = test?.goodbye ?? location?.state?.test ?? '';

  const editor = useRef(null);

  const navigate = useNavigate();

  const user = useContext(userContext);

  const handleUpdate = async () => {
    const response = await general({
      ...test,
      goodbye
    });
    if (response) {
      setTest(response);
      if (await handleFinish()) {
        setTimeout(() => {
          navigate('/admin/surveys/test');
        }, 2000);
      }
    }
  }

  const handleFinish = async () => {
    return await finishTest(test.id);
  };

  const handlePreview = async () => {
    if (test?.presentations > 0) {
      return redirectPreview(test)
    }
    const response = await general({
      ...test,
      goodbye
    });
    if (response) {
      setTest(response);
      await redirectPreview(response)
    } else {
      toast('Error al generar la previsualización')
    }
  };

  const redirectPreview = async (currentTest) => {
    const token = await preview(currentTest.id);
    if (token) {
      return navigate(`/admin/surveys/answer/${token}`, {state: {test: currentTest}});
    }
    toast('Error al generar la previsualización', true);
  }

  const disabled = test?.presentations > 0 ?? true;

  const config = {
    readonly: disabled,
    uploader: {
      insertImageAsBase64URI: true
    }
  };

  return (
    <Grid item xs={12}>
      <label>Escriba una breve despedida:</label>
      <JoditEditor
        ref={editor}
        config={config}
        value={goodbye ?? test?.goodbye}
        onChange={(text) => goodbye = text}
      />
      <div style={{marginTop: '2em'}}>
        <Button
          variant={"contained"}
          onClick={handleUpdate}
          disabled={test?.presentations > 0}
        >
          Finalizar la configuración
        </Button>
        <Button
          variant={"contained"}
          onClick={handlePreview}
          sx={{float: 'right'}}
          color={'info'}
          disabled={!user?.actions?.create}
        >
          Previsualizar encuesta
        </Button>
      </div>
    </Grid>
  );
}