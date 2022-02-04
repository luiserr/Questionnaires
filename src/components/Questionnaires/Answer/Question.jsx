import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Paper} from "@mui/material";
import React from "react";
import {useQuestion} from "../../hooks/testHook";

export default function Question({question}) {

  const Question = useQuestion(question);

  return (
    <>
      <Box sx={{marginTop: '2em'}}>
        <div dangerouslySetInnerHTML={{__html: question.description}}/>
      </Box>
      <Box sx={{marginTop: '2em'}}>
        {Question}
      </Box>
    </>
  );
}