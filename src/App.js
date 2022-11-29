import React, {useEffect, useState} from "react";
import {Alert, Box, LinearProgress, Typography} from "@mui/material";
import UserContext from './context/userContext';
import Routes from './routes/Routes';
import {getUser} from "./tools/generalRequest";
import './styles/app.css';
import {myAlert} from "./utils/alerts";
import {$_get} from "./utils/tools";


function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(async () => {
    const params = $_get();
    if (!params.token) {
      const user = await getUser();
      if (user) {
        setUser(user);
      } else {
        myAlert('Usted no tiene permisos para ingresar a este módulo');
        setTimeout(()=> {
          window.location.href = '/admin';
        }, 4000);
      }
    } else {
      setUser({});
      setToken(params.token)
    }
  }, []);


  return (
    <>
      {
        user !== null ?
          <UserContext.Provider value={{...user}}>
            <Routes token={token}/>
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
