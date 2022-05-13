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

export default function PeriodAssigment({info, setInfo, payload, setPayload}) {

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