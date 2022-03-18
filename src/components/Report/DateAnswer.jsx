import React, {useEffect, useState} from "react"
import { 
  Grid,
  TextField
} from "@mui/material"
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

export default function DateAnswer({info, setInfo, payload, setPayload}) {

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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Fecha inicio"
            size={"small"}
            onChange={(e) => {
              setPayload({
                ...payload,
                startDateAnswer: getFormattedDate(e),
                startDateAnswerInput: e
              })
            }}
            renderInput={(params) => <TextField {...params} fullWidth/>}
            value={payload?.startDateAnswerInput}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Fecha fin"
            size={"small"}
            onChange={(e) => {
              setPayload({
                ...payload,
                finishDateAnswer: getFormattedDate(e),
                finishDateAnswerInput: e
              })
            }}
            renderInput={(params) => <TextField {...params} fullWidth/>}
            value={payload?.finishDateAnswerInput}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}