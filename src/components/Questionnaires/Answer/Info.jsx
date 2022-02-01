import {Box, Divider, Paper} from "@mui/material";
import React from "react";

export default function Info({presentation}) {
  return (
    <>
      <h4>Titulo: {presentation?.title}</h4>
      <Divider/>
      <Box component={Paper} sx={{minHeight: '200px', marginTop: '2em', padding: '2em'}}>
        <div dangerouslySetInnerHTML={{__html: presentation?.description}}/>
      </Box>
    </>
  );
}