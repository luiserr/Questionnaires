import AddCircleIcon from '@mui/icons-material/AddCircle';
import ViewListIcon from '@mui/icons-material/ViewList';
import SettingsIcon from '@mui/icons-material/Settings';
import React from "react";

export default [
  {label: 'Listado de formularios', route: '/list', icon: <ViewListIcon />},
  {label: 'Nuevo formulario', route: '/test/_', icon: <AddCircleIcon/>},
  {label: 'Configurar presentación', route: '/assigment', icon: <SettingsIcon/>}
];