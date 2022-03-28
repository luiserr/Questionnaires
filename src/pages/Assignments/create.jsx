import Box from "@mui/material/Box";
import {Button, CardActions, CardContent, Divider, FormControlLabel, Paper, Switch, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useTest} from "../../components/hooks/testHook";
import Card from "@mui/material/Card";
import {useNavigate, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import AssigmentType from "../../components/Presentations/AssigmentType";
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {buildPayload, validatePayload} from "../../utils/presentations/presentation";
import {getPresentation, saveAssign} from "../../tools/assignRequests";
import {myAlert} from "../../utils/alerts";
import {es}  from 'date-fns/locale'
import {getFormattedDate} from "../../tools/dates";

export default function CreateAssign() {

  const [data, setData] = useState({
    roles: [],
    regionals: [],
    centerTrainings: [],
    email: '',
  });

  const [payload, setPayload] = useState({
    title: '',
    presentationTitle: '',
    startDateInput: null,
    finishDateInput: null,
    startDate: null,
    finishDate: null,
    tries: 1,
    anonymous: false,
    roles: [],
    regionals: {},
    programs: {},
    emails: [],
    dates: {},
    complementaryDays: 7,
    abilityDays: 5,
    notify: true,
    notifyUncompleted: 5
  });

  const {testId, presentationId} = useParams();

  const {test} = useTest(testId);

  const navigate = useNavigate();

  useEffect(async () => {
    if (presentationId !== '_') {
      const response = await getPresentation(presentationId);
      if (response) {
        const {assignments, ...others} = response;
        setPayload({
          ...payload,
          ...others,
          ...assignments,
          startDateInput: new Date(others?.startDate),
          finishDateInput: new Date(others?.finishDate)
        });
      } else {
        navigate('/admin/surveys/test');
      }
    }
  }, []);

  const handleChange = (key, value) => {
    setPayload({
      ...payload,
      [key]: value
    })
  };

  const handleSave = async () => {
    if (validatePayload(payload)) {
      const response = await saveAssign(test.id, buildPayload(test, presentationId, payload));
      if (response) {
        myAlert('Operación exitosa', 'success');
        setTimeout(() => {
          navigate('/admin/surveys/test');
        }, 3000);
      }
    }
  }

  const handleBack = () => {
    navigate('/admin/surveys/test');
  };

  const tomorrow = () => {
    const toDay = new Date();
    toDay.setDate(toDay.getDate() + 1);
    return toDay;
  }

  return (
    <Box sx={{width: '100%'}}>
      <h4>Creación de asignación encuesta: {test?.title}</h4>
      <Card elevation={2} sx={{mt: 1}}>
        <CardContent>
          <h4>Información general</h4>
          <Divider sx={{mb: 2}}/>
          <Button
            sx={{float: 'right'}}
            startIcon={<ArrowBackIcon/>}
            onClick={handleBack}
          >
            Regresar
          </Button>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Título"
                required
                fullWidth
                inputProps={{
                  maxLength: 150
                }}
                variant="outlined"
                value={payload?.presentationTitle}
                onChange={(e) => handleChange('presentationTitle', e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Número de intentos"
                required
                fullWidth
                type={"number"}
                variant="outlined"
                value={payload?.tries}
                onChange={(e) => handleChange('tries', e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <FormControlLabel
                control={<Switch
                  checked={payload?.anonymous}
                  onChange={(e, checked) => handleChange('anonymous', checked)}/>}
                label={'Encuesta anónima'}
              />
            </Grid>
            <Grid item xs={2}>
              <FormControlLabel
                control={<Switch
                  checked={payload?.notify}
                  onChange={(e, checked) => handleChange('notify', checked)}/>}
                label={'Activar notificación'}
              />
            </Grid>
          </Grid>
          <Grid container sx={{mt: 2}} spacing={2}>
            <Grid item xs={6}>
              <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Fecha inicio *"
                  required
                  size={"small"}
                  minDate={tomorrow()}
                  onChange={(e) => {
                    setPayload({
                      ...payload,
                      startDate: getFormattedDate(e),
                      startDateInput: e
                    })
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth/>}
                  value={payload?.startDateInput}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Fecha fin *"
                  size={"small"}
                  minDate={tomorrow()}
                  required
                  onChange={(e) => {
                    setPayload({
                      ...payload,
                      finishDate: getFormattedDate(e),
                      finishDateInput: e
                    })
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth/>}
                  value={payload?.finishDateInput}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container sx={{mt: 2}} spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Días de habilitación pos fecha de finalización"
                required
                fullWidth
                value={payload?.abilityDays}
                onChange={(e) => handleChange('abilityDays', e.target.value)}
                type={"number"}
                inputProps={{
                  min: 0,
                  max: 365
                }}
                variant="outlined"/>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Días de activación antes de finalización de ficha (Solo formación complementaria)"
                fullWidth
                required
                value={payload?.complementaryDays}
                onChange={(e) => handleChange('complementaryDays', e.target.value)}
                type={"number"}
                variant="outlined"
                inputProps={{
                  min: 0,
                  max: 30
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Días de notificación, sí no se ha contestado la encuesta"
                fullWidth
                required
                value={payload?.notifyUncompleted}
                onChange={(e) => handleChange('notifyUncompleted', e.target.value)}
                type={"number"}
                variant="outlined"
                inputProps={{
                  min: 0,
                  max: 365
                }}
              />
            </Grid>
          </Grid>
          <Paper elevation={2} spacing={2} sx={{m: 2, p: 2, backgroundColor: '#efefef'}}>
            <Grid item xs={12}>
              <h4>Tipos de asignación</h4>
              <Divider sx={{mb: 2}}/>
              <AssigmentType
                data={data}
                setData={setData}
                payload={payload}
                setPayload={setPayload}
              />
            </Grid>
          </Paper>
        </CardContent>
        <Button
          sx={{float: 'right', mb: 2, mr: 3}}
          variant={'contained'}
          color={'success'}
          startIcon={<SaveIcon/>}
          onClick={handleSave}
        >
          Guardar
        </Button>
        <CardActions>
        </CardActions>
      </Card>
    </Box>
  );
}