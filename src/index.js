import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom'
import App from "./App";

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {esES} from '@mui/material/locale';

// const params = $_get();

// const groupId = parseInt(params['groupId']);


const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#1976d2',
      dark: '#115293',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },

    transparent: {
      main: "#ffffff00",
      contrastText: "#ffffff",
    },

    overrides: {
      MuiButton: {
        color: 'inherit',
        backgroundColor: "#ffffff00"
      },
      MuiSvgIcon: {
        color: 'inherit',
      },
      MuiPaper: {
        color: 'inherit',
      },
    },
  },
}, esES,);


ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App groupId={null}/>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

