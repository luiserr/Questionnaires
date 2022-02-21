import React, {useEffect, useState} from "react";
import {getRegionals} from "../../../tools/assignRequests";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as PropTypes from 'prop-types';
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from "@mui/material";
import Roles from "./Rol";

const headCells = [
  {
    id: 'id',
    label: 'Id',
  },
  {
    id: 'name',
    label: 'Nombre',
  },
  {
    id: 'city',
    label: 'Cuidad',
  },
  {
    id: 'departament',
    label: 'departament',
  },
];

export default function Index({data, setData, payload, setPayload}) {

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
            id="panel1a-header"
          >
            <Typography>1. Selección de roles</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Roles
                data={data}
                setPayload={setPayload}
                setData={setData}
                payload={payload}
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>2. Selección de modalidad</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Roles
                data={data}
                setPayload={setPayload}
                setData={setData}
                payload={payload}
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>


      {/*<Grid container spacing={2}>*/}
      {/*  <Grid item xs={12} sx={{height: '300px'}}>*/}
      {/*    <Typography>1. Seleccione un rol</Typography>*/}
      {/*    {*/}
      {/*      data?.roles.map((rol) =>*/}
      {/*        <FormGroup key={rol.id}>*/}
      {/*          <FormControlLabel control={<Checkbox/>} label={rol.name}/>*/}
      {/*        </FormGroup>*/}
      {/*      )*/}
      {/*    }*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}
      {/*{*/}
      {/*  regionals.length > 0 &&*/}
      {/*  <TableFront*/}
      {/*    title={'Regionales'}*/}
      {/*    rows={regionals}*/}
      {/*    headers={headCells}*/}
      {/*    handleSelect={(e) => console.log(e)}*/}
      {/*    rowSelected={payload?.regionals ?? []}*/}
      {/*  />*/}
      {/*}*/}
    </>
  );
}

Index.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  payload: PropTypes.object,
  setPayload: PropTypes.func,
};