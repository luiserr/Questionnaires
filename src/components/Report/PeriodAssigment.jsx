import React, {useEffect, useState} from "react"
import { 
  Grid,
  TextField
} from "@mui/material"
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import {es} from "date-fns/locale";

export default function PeriodAssigment({info, setInfo, payload, setPayload}) {

  function getFormattedDate(date) {
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return month + '/' + day + '/' + year;
  }

  return (
    <Grid container sx={{mt: 2}} spacing={2}>
      <Grid item xs={6}>
        <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Fecha inicio"
            size={"small"}
            onChange={(e) => {
              setPayload({
                ...payload,
                startDateAssigment: getFormattedDate(e),
                startDateAssigmentInput: e
              })
            }}
            renderInput={(params) => <TextField {...params} fullWidth/>}
            value={payload?.startDateAssigmentInput}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Fecha fin"
            size={"small"}
            onChange={(e) => {
              setPayload({
                ...payload,
                finishDateAssigment: getFormattedDate(e),
                finishDateAssigmentInput: e
              })
            }}
            renderInput={(params) => <TextField {...params} fullWidth/>}
            value={payload?.finishDateAssigmentInput}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}