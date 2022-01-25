import {Box, Grid, Paper, styled} from "@mui/material";
import {ResponsiveAppBar} from "./navbar";
import React from "react";

function Header() {
  const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ResponsiveAppBar/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export {Header};
