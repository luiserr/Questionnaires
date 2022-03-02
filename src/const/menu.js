import ViewListIcon from '@mui/icons-material/ViewList';
import QuizIcon from '@mui/icons-material/Quiz';

import React from "react";

export default [
  {label: 'Encuestas', route: '/admin/surveys/', icon: <QuizIcon />},
  {label: 'Asignaciones en ejecución', route: '/admin/surveys/', icon: <ViewListIcon/>}
];