import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";

export default function Single() {
  return (
    <Grid item xs={6}>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
      />
    </Grid>
  );
}