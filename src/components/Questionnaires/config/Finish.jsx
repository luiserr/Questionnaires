import {Button, Grid} from "@mui/material";
import JoditEditor from "jodit-react";
import React, {useState} from "react";
import {finishTest, general, preview} from "../../../tools/testRequests";
import {useNavigate} from "react-router-dom";
import {toast} from "../../../utils/alerts";

export default function Finish({test}) {

  const [goodbye, setGoodbye] = useState(test?.goodbye ?? '');

  const navigate = useNavigate();

  const handleUpdate = async () => {
    const response = await general({
      ...test,
      goodbye
    });
    if (response) {
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
    const token = await preview(test.id);
    if (token) {
      return navigate(`/admin/surveys/answer/${token}`);
    }
    toast('No se pudo generar el token de validación', true);
  };

  return (
    <Grid item xs={12}>
      <label>Escriba una breve despedida:</label>
      <JoditEditor
        value={goodbye}
        onBlur={(text) => setGoodbye(text)}
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
          disabled={test?.presentations > 0}
        >
          Previsualizar encuesta
        </Button>
      </div>
    </Grid>
  );
}