import React, {useEffect, useState} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {GradeCenter} from "../components/GradeCenter";
import NavBar from "../components/NavBar";
import {StateProvider} from "./components/hooks/ContextHook";
import * as PropTypes from 'prop-types';
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import {get} from '../utils/ajax';
import {myAlert} from '../utils/alerts';

import "./App.css";
import "./App.scss";

const StudensRoles = [301,2549];

function App({groupId}) {
  const [user, setUser] = useState(null);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(async () => {
    if (groupId) {
      // const response = await get(`https://sena.dev.tests.mx/api/user/group/${groupId}`, true);
      // const response = await get(`https://sena.pruebas.local.la/api/user/group/${groupId}`, true);
      const response = await get(`group/${groupId}`, false, 'user');

      if (response.success) {
        if (response.data) {
          let groupInfo = response.data.group;
          let rol = groupInfo ? response.data.group.level : 0;
          let _isEstudent = rol === 0 ? true : StudensRoles.includes(rol);
          setIsStudent(_isEstudent);
          return setUser(response.data);
        }
        return myAlert('Ud no tiene permisos para entrar a este modulo');
      }
      return myAlert('Ocurrió un error al cargar la información, por favor vuelva a intentarlo')
    }
    return myAlert('Código del grupo requerido');
  },[]);



  return (<>
    <StateProvider>
      <NavBar user={user} isStudent={isStudent}/>
      <Container maxWidth="100vw"  maxHeight="100vh" sx={{marginTop: '2rem'}}>
        {user && groupId ?

          <GradeCenter 
            group={user?.group} 
            userId={user.id}
            idgrupo={groupId} 
            idsocial={user?.group?.socialId} 
            isStudent = {isStudent} 
            user={user}
          />
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
      </Container>
    </StateProvider>
  </>);
}

App.propTypes = {
  groupId: PropTypes.number.isRequired,
};

export default App;
