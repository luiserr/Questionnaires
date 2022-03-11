import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useEffect, useState} from "react";
import {Alert, Box, Card, CardContent, Grid} from "@mui/material";
import {getDependencies} from "../../tools/testRequests";
import {useLocation, useParams} from "react-router-dom";
import Dependencies from "../../components/Questionnaires/config/Dependencies/Dependencies";

export default function Dependency() {
  const [dependencies, setDependencies] = useState([]);

  const location = useLocation();

  const question = location.state.question;

  const {testId, sectionId, questionId} = useParams();

  useEffect(async () => {
    const response = await getDependencies(questionId, sectionId, testId);
    setDependencies(response);
  }, []);

  const handleBack = () => {

  };

  return (
    <Box sx={{width: '100%'}}>
      <h4>
        Gestionar dependencias
      </h4>
      <Card elevation={2} sx={{marginTop: '2em'}}>
        <CardContent sx={{minHeight: '350px'}}>
          <Button
            sx={{float: 'right'}}
            startIcon={<ArrowBackIcon/>}
            onClick={() => handleBack()}
          >
            Regresar
          </Button>
          <Grid container spacing={2} sx={{marginTop: '2em'}}>
            {
              dependencies.length ?
                <Dependencies
                  dependencies={dependencies}
                  testId={testId}
                  currentSection={sectionId}
                  currentQuestion={question}
                />
                :
                <Grid item xs={12}>
                  <Alert color={'warning'}>No hay datos para mostrar</Alert>
                </Grid>
            }
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}