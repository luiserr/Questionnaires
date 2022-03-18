import {
  Box, 
  Card, 
  CardContent, 
  Paper, 
  Grid, 
  Divider, 
  Button, 
  Link
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getSurveyAssigment, createReport } from "../../tools/reportRequests";
import { myAlert } from "../../utils/alerts";
import { validatePayload } from "../../utils/report/report";

import AssigmentTypeForm from "../../components/Report/AssigmentTypeForm";

export default function CreateReport() {

  const {testId, presentationId} = useParams();

  const navigate = useNavigate();

  const [info, setInfo] = useState({
    information: {
      idTest: null,
      titleTest: '',
      idPresentation: null,
      titlePresentation: '',
      typePresentation: '',
      triesPresentation: null
    },
    data: []
  });

  const [payload, setPayload] = useState({
    testId: testId,
    presentationId: presentationId,
    roles: [],
    modalities: [],
    courseTypes: [],
    regionals: [],
    centers: [],
    programs: [],
    groups: [],
    startDateAssigment: null,
    finishDateAssigment: null,
    startDateAssigmentInput: null,
    finishDateAssigmentInput: null,
    startDateAnswer: null,
    finishDateAnswer: null,
    startDateAnswerInput: null,
    finishDateAnswerInput: null
  });

  useEffect(async () => {
    const response = await getSurveyAssigment(testId, presentationId);
    if (response) {
      const { information, data } = response;
      setInfo({
        ...info,
        information: information,
        data: data
      });
    }
  }, []);

  const handleBack = () => {
    navigate(`/admin/surveys/test/${testId}/presentations`);
  };

  const handleCreate = async () => {
      if (validatePayload(payload)) {
        const response = await createReport(payload);
        console.log(response);
        myAlert('Operación exitosa', 'success');
      }
  }

  return (
    <Box sx={{width: '100%'}}>
      <h4>Creación de reporte: {info.information?.titleTest}</h4>
      <Card elevation={2} sx={{mt: 1}}>
        <CardContent>
          <Button
            sx={{float: 'right'}}
            startIcon={<ArrowBackIcon/>}
            onClick={handleBack}
          >
            Regresar
          </Button>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={2} spacing={2} sx={{m: 2, p: 2, backgroundColor: '#efefef'}}>
                <Grid item xs={12}>
                  <h4>Asignación: {info.information?.titlePresentation}</h4>
                  <Divider sx={{mb: 2}}/>
                  <AssigmentTypeForm
                    info={info}
                    setInfo={setInfo}
                    payload={payload} 
                    setPayload={setPayload}
                  />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
        <Button
          sx={{float: 'right', mb: 2, mr: 3}}
          variant={'contained'}
          color={'success'}
          onClick={handleCreate}
          startIcon={<AddIcon/>}
        >
          Crear
        </Button>
      </Card>
    </Box>
  );
}