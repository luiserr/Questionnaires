import {Button, Grid} from "@mui/material";
import JoditEditor from "jodit-react";
import React, {useState} from "react";
import {finishTest, general} from "../../../tools/testRequests";
import {useNavigate} from "react-router-dom";

export default function Finish({test}) {

  const [goodbye, setGoodbye] = useState(test?.goodbye ?? '');

  const navigate = useNavigate();

  const handleUpdate = async () => {
    const response = await general({
      ...test,
      goodbye
    });
    if (response) {
      await handleFinish();
      setTimeout(() => {
        navigate('/test');
      }, 2000)
    }
  }

  const handleFinish = async () => {
    await finishTest(test.id);
  };

  return (
    <Grid item xs={12}>
      <label>Escriba una breve despedida:</label>
      <JoditEditor
        value={goodbye}
        onBlur={(text) => setGoodbye(text)}
      />
      <div style={{marginTop: '2em'}}>
        <Button variant={"contained"} onClick={handleUpdate}>
          Finalizar la configuración
        </Button>
      </div>
    </Grid>
  );
}