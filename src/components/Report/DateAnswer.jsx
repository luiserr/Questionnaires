import React, {useEffect, useState} from "react"
import { 
  Grid,
  TextField
} from "@mui/material"
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import {es} from "date-fns/locale";
import {getFormattedDate} from "../../tools/dates";

export default function DateAnswer({info, setInfo, payload, setPayload}) {

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
        <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
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