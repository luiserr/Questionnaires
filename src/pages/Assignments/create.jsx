import Box from "@mui/material/Box";
import {CardContent, Divider, TextField} from "@mui/material";
import React, {useState} from "react";
import {useTest} from "../../components/hooks/testHook";
import Card from "@mui/material/Card";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import AssigmentType from "../../components/Presentations/AssigmentType";

export default function CreateAssign() {

  const [data, setData] = useState({
    roles: [],
    regionals: [],
    centerTrainings: [],
    email: '',
  });

  const [payload, setPayload] = useState({
    roles: [],
    email: '',
    regionals: {},
    programs: {}
  });

  const {testId} = useParams();

  const {test} = useTest(testId);

  return (
    <Box sx={{width: '100%'}}>
      <h4>Creacion de asignacion cuestionario: {test?.title}</h4>
      <Card elevation={2} sx={{mt: 1}}>
        <CardContent>
          <h4>Información general</h4>
          <Divider sx={{mb: 2}}/>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Título"
                fullWidth
                variant="outlined"/>
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Número de intentos"
                fullWidth
                type={"number"}
                variant="outlined"/>
            </Grid>
          </Grid>
          <Grid container sx={{mt: 2}} spacing={2}>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Fecha inicio"
                  size={"small"}
                  onChange={(e) => console.log(e)}
                  date={'2022-02-03'}
                  renderInput={(params) => <TextField {...params} fullWidth/>}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Fecha fin"
                  size={"small"}
                  onChange={(e) => console.log(e)}
                  renderInput={(params) => <TextField {...params} fullWidth/>}
                  date={""}
                  renderInput={(params) => <TextField {...params} fullWidth/>}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container sx={{mt: 2}} spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Dias de habilitación pos fecha de finalización"
                fullWidth
                type={"number"}
                variant="outlined"/>
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Dias de activación antes de finalizacion de ficha (Solo Títuladas)"
                fullWidth
                type={"number"}
                variant="outlined"/>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{mt: 2}}>
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
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}