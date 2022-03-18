import React, { useState } from 'react'
import { 
  Box, 
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@mui/material"
import { useReport } from "../hooks/reportHook"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Roles from "./Rol"
import Modalities from "./Modalities"
import CourseTypes from "./CourseTypes"
import Regionals from './Regionals'
import Centers from './Centers'
import Programs from './Programs'
import Groups from './Groups'
import PeriodAssigment from './PeriodAssigment'
import DateAnswer from './DateAnswer'

export default function AssigmentTypeForm({ 
  info, 
  setInfo, 
  payload, 
  setPayload
}) {

  const { data } = info;

  const [ 
    listRoles, 
    listModalities, 
    listCourseTypes, 
    listRegionals, 
    listCenters,
    listPrograms,
    listGroups
  ] = useReport(data);

  return (
    <Grid item xs={12}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Accordion sx={{mb: 2}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
          >
            <Typography>Roles</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Roles
              info={info}
              setInfo={setInfo} 
              listRoles={listRoles}
              payload={payload} 
              setPayload={setPayload}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{mb: 2}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
          >
            <Typography>Modalidad</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <Modalities
              info={info}
              setInfo={setInfo}
              listModalities={listModalities} 
              payload={payload} 
              setPayload={setPayload}
            />

          </AccordionDetails>
        </Accordion>

        <Accordion sx={{mb: 2}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
          >
            <Typography>Tipos de curso</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <CourseTypes
              info={info}
              setInfo={setInfo} 
              listCourseTypes={listCourseTypes}
              payload={payload} 
              setPayload={setPayload}
            />

          </AccordionDetails>
        </Accordion>

        <Accordion sx={{mb: 2}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
          >
            <Typography>Regionales</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <Regionals
              info={info}
              setInfo={setInfo}
              listRegionals={listRegionals} 
              payload={payload} 
              setPayload={setPayload}
            />

          </AccordionDetails>
        </Accordion>

        <Accordion sx={{mb: 2}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
          >
            <Typography>Centros de formación</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <Centers
              info={info}
              setInfo={setInfo} 
              listCenters={listCenters} 
              payload={payload} 
              setPayload={setPayload}
            />

          </AccordionDetails>
        </Accordion>

        <Accordion sx={{mb: 2}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
          >
            <Typography>Programas de formación</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <Programs
              info={info}
              setInfo={setInfo} 
              listPrograms={listPrograms} 
              payload={payload} 
              setPayload={setPayload}
            />

          </AccordionDetails>
        </Accordion>

        <Accordion sx={{mb: 2}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
          >
            <Typography>Fichas de formación</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <Groups
              info={info}
              setInfo={setInfo} 
              listGroups={listGroups} 
              payload={payload} 
              setPayload={setPayload}
            />

          </AccordionDetails>
        </Accordion>

        <Accordion sx={{mb: 2}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
          >
            <Typography>Periodo de asignación</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <PeriodAssigment
              info={info}
              setInfo={setInfo} 
              payload={payload} 
              setPayload={setPayload}
            />

          </AccordionDetails>
        </Accordion>

        <Accordion sx={{mb: 2}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
          >
            <Typography>Fechas de respuesta</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <DateAnswer
              info={info}
              setInfo={setInfo} 
              payload={payload} 
              setPayload={setPayload}
            />

          </AccordionDetails>
        </Accordion>

      </Box>
    </Grid>
  );
}