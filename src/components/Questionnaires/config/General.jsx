import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import React, {useEffect, useRef, useState} from "react";
import * as PropTypes from 'prop-types';
import FormControl from "@mui/material/FormControl";
import JoditEditor from "jodit-react";

export default function General({test, setPayload}) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTitle(test?.title || '');
    setDescription(test?.description || '');
  }, [test]);

  useEffect(() => {
    setPayload({
      id: test?.id || null,
      description,
      title,
      wasEdit: test.title !== title || test.description !== description || window.description !== test?.description
    });
  }, [title, description]);

  const disabled = test?.presentations > 0 ?? true;

  const config = {
    "uploader": {
      "insertImageAsBase64URI": true
    },
    "language": "es",
    "defaultMode": "1",
    "toolbarStickyOffset": -1,
    "askBeforePasteHTML": false,
    disablePlugins: "print",
    "askBeforePasteFromWord": false
  };

  return (
    <>
      <Grid item xs={12}>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <TextField
              disabled={disabled}
              id="title"
              required
              inputProps={{
                maxLength: 150
              }}
              label="Título"
              variant="outlined"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={10} sx={{marginTop: '1em'}}>
          <label>Descripción*</label>
          <JoditEditor
            config={config}
            value={window.description}
            onChange={(text) => {
              window.description = text;
            }}
            onBlur={(text) => {
              // setTimeout(() => {
              //   if (!disabled) {
              //     setDescription(editor.current.value)
              //   } else {
              //     setDescription(description)
              //   }
              // }, 100);
            }}
          />
        </Grid>
      </Grid>
    </>

  );
}

General.propTypes = {
  test: PropTypes.object,
  setPayload: PropTypes.func.isRequired,
};