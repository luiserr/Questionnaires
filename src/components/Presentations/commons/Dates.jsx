import React from 'react';
import {AccordionDetails, Alert, Grid, TextField} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {es} from "date-fns/locale";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import {getFormattedDate} from "../../../tools/dates";

const Dates = ({payload, setPayload, entity, disabled}) => {

  const handleChangeSelect = (value) => {
    setPayload({
      ...payload,
      [entity]: {
        ...payload[entity],
        dates: {
          ...payload[entity]?.dates,
          dateType: value
        }
      }
    })
  }

  const handleChangeDate = (typeDate, value) => {
    setPayload({
      ...payload,
      [entity]: {
        ...payload[entity],
        dates: {
          ...payload[entity]?.dates,
          [typeDate]: getFormattedDate(value),
          [`${typeDate}Input`]: value
        }
      }
    });
  }

  return (
    <Grid container xs={12} spacing={3}>
      <Grid item xs={10}>
        <Alert color={'info'}>Tenga en cuenta:<br/>
          El campo <b>Días de activación antes de finalización de ficha (Solo formación complementaria).</b>
          Afectará la búsqueda de las fichas, debido a que el sistema buscará fichas que finalicen en el rango
          especifico menos los días que se estipulen en este campo.
        </Alert>
      </Grid>
      <Grid item xs={10}>
        <InputLabel id="dateType">Aplicar la fecha para:</InputLabel>
        <Select
          disabled={disabled}
          labelId="dateType"
          label="Aplicar la fecha para:"
          sx={{width: '50%'}}
          value={payload[entity]?.dates?.dateType ?? 'finish'}
          onChange={e => handleChangeSelect(e.target.value)}
          size="small"
        >
          <MenuItem value={'finish'}> Finalización de fichas </MenuItem>
          <MenuItem value={'start'}> Inicio de fichas </MenuItem>
        </Select>
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
          <DatePicker
            disabled={disabled}
            label="Fecha inicio"
            size={"small"}
            onChange={(e) => handleChangeDate('startDate', e)}
            renderInput={(params) => <TextField {...params} fullWidth/>}
            value={payload[entity]?.dates?.startDateInput ?? ''}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
          <DatePicker
            disabled={disabled}
            label="Fecha fin"
            size={"small"}
            onChange={(e) => handleChangeDate('finishDate', e)}
            renderInput={(params) => <TextField {...params} fullWidth/>}
            value={payload[entity]?.dates?.finishDateInput ?? ''}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};

export default Dates;
