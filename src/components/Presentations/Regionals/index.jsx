import React, {useEffect, useState} from "react";
import {getRegionals} from "../../../tools/assignRequests";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as PropTypes from 'prop-types';
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from "@mui/material";
import Roles from "./Rol";
import Modalities from "./Modalities";
import CourseTypes from "./CourseTypes";
import Regionals from "./Regionals";
import Dates from "../commons/Dates";
import Programs from "../commons/Programs";

export default function Index({data, setData, payload, setPayload, disabled}) {

  const [regionals, setRegionals] = useState(data?.regionals ?? []);

  useEffect(async () => {
    if (regionals.length === 0) {
      const response = await getRegionals();
      setData({
        ...data,
        regionals: response
      });
      setRegionals(response);
    }
  }, []);

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
              disabled={disabled}
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
              disabled={disabled}
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
              disabled={disabled}
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
            <Typography>4. Selección de programas de formación *</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Programs
              payload={payload}
              setPayload={setPayload}
              data={data}
              setData={setData}
              disabled={disabled}
              entity={'regionals'}
              />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
          >
            <Typography>5. Selección de fechas *</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Dates entity={'regionals'} setPayload={setPayload} payload={payload} disabled={disabled}/>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
          >
            <Typography>6. Selección de regionales * </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Regionals
              disabled={disabled}
              data={data}
              setPayload={setPayload}
              setData={setData}
              payload={payload}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}

Index.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  payload: PropTypes.object,
  setPayload: PropTypes.func,
};