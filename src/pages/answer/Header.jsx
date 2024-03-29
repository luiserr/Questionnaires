import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {logoSenaBlanco, logoSenaNaranja} from "../../utils/images";
import {Button} from "@mui/material";

export default function DenseAppBar() {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor: '#e57816'}}>
        <Toolbar variant="dense">
          <img width={40} height={40} src={logoSenaBlanco} alt={'Logo SENA'} title={'Logo SENA'}/>
          <Typography variant="h6" color="inherit" component="div" sx={{ml: 2}}>
            SENA - Encuestas
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}