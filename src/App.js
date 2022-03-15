import React, {useEffect, useState} from "react";
import {Alert, Box, LinearProgress, Typography} from "@mui/material";
import UserContext from './context/userContext';
import Routes from './routes/Routes';
import {getUser} from "./tools/generalRequest";
import './styles/app.css';
import {myAlert} from "./utils/alerts";


function App() {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const user = await getUser();
    if (user) {
      setUser(user);
    }else {
      myAlert('Usted no tiene permisos para ingresar a este módulo');
    }
  }, []);


  return (
    <>
      {
        user !== null ?
          <UserContext.Provider value={{...user}}>
            <Routes/>
          </UserContext.Provider>
          :
          <Box sx={{width: '100%'}}>
            <Alert severity="info" sx={{width: '100%'}}>
              <Typography>
                Cargando información ...
              </Typography>
            </Alert>
            <LinearProgress/>
          </Box>
      }
    </>
  )
}

export default App;
