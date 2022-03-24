import React, {useEffect} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as PropTypes from 'prop-types';
import {Accordion, AccordionDetails, AccordionSummary, Alert, Box, Grid, TextField, Typography} from "@mui/material";
import Roles from "../commons/Rol";
import Modalities from "../commons/Modalities";
import CourseTypes from "../commons/CourseTypes";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {es} from "date-fns/locale";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import {getFormattedDate} from "../../../tools/dates";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


export default function Dates({data, setData, payload, setPayload}) {

  useEffect(() => {
    if (Object.keys(payload?.dates).length) {
      setPayload({
        ...payload,
        dates: {
          dateType: 'finish',
          ...payload?.dates,
          startDateInput: new Date(payload?.dates?.startDate),
          finishDateInput: new Date(payload?.dates?.finishDate)
        }
      });
    } else {
      setPayload({
        ...payload,
        dates: {
          dateType: 'finish',
        }
      });
    }
  }, []);


  const tomorrow = () => {
    const toDay = new Date();
    toDay.setDate(toDay.getDate() + 1);
    return toDay;
  }


  return (
    <>
      <Box sx={{mt: 2}}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
          >
            <Typography>1. Selección de roles</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Roles
              entity={'dates'}
              data={data}
              setPayload={setPayload}
              setData={setData}
              payload={payload}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
          >
            <Typography>2. Selección de modalidad</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Modalities
              entity={'dates'}
              data={data}
              setPayload={setPayload}
              setData={setData}
              payload={payload}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
          >
            <Typography>3. Selección de tipo de curso</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CourseTypes
              entity={'dates'}
              data={data}
              setPayload={setPayload}
              setData={setData}
              payload={payload}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
          >
            <Typography>4. Selección de fechas</Typography>
          </AccordionSummary>
          <AccordionDetails>
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
                  labelId="dateType"
                  label="Aplicar la fecha para:"
                  sx={{width: '50%'}}
                  value={payload?.dates?.dateType ?? 'finish'}
                  onChange={e => setPayload({
                    ...payload,
                    dates: {
                      ...payload.dates,
                      dateType: e.target.value
                    }
                  })}
                  size="small"
                >
                  <MenuItem value={'finish'}> Finalización de fichas </MenuItem>
                  <MenuItem value={'start'}> Inicio de fichas </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Fecha inicio"
                    size={"small"}
                    minDate={tomorrow()}
                    onChange={(e) => {
                      setPayload({
                        ...payload,
                        dates: {
                          ...payload.dates,
                          startDate: getFormattedDate(e),
                          startDateInput: e
                        }
                      })
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth/>}
                    value={payload?.dates?.startDateInput ?? ''}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Fecha fin"
                    size={"small"}
                    minDate={tomorrow()}
                    onChange={(e) => {
                      setPayload({
                        ...payload,
                        dates: {
                          ...payload.dates,
                          finishDate: getFormattedDate(e),
                          finishDateInput: e
                        }
                      })
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth/>}
                    value={payload?.dates?.finishDateInput ?? ''}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}

Dates.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  payload: PropTypes.object,
  setPayload: PropTypes.func,
};