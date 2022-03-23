import ViewListIcon from '@mui/icons-material/ViewList';
import QuizIcon from '@mui/icons-material/Quiz';
import StyleIcon from '@mui/icons-material/Style';
import AssessmentIcon from '@mui/icons-material/Assessment';

import React from "react";

export default [
  {label: 'Encuestas', route: '/admin/surveys/', icon: <QuizIcon/>},
  // {label: 'Asignaciones en ejecución', route: '/admin/surveys/', icon: <ViewListIcon/>},
  {label: 'Categorías de encuestas', route: '/admin/surveys/categories', icon: <StyleIcon/>},
  {label: 'Reportes', route: '/admin/surveys/reports', icon: <AssessmentIcon/>}
];