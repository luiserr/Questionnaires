import {Box, Grid, Tab, Tabs} from "@mui/material";
import React from 'react';
import {useManualAssign} from "../hooks/presentationHook";
import * as PropTypes from 'prop-types';

export default function AssigmentType({data, setData, payload, setPayload, disabled}) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Component = useManualAssign(value, data, setData, payload, setPayload, disabled);

  return (
    <Grid item xs={12}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Roles"/>
          <Tab label="Regionales y centros"/>
          <Tab label="Programas de formación"/>
          <Tab label="Correo electrónico"/>
          <Tab label="Fichas"/>
          <Tab label="Rango de fechas"/>
          {/*<Tab label="Tipo de programa"/>*/}
        </Tabs>
      </Box>
      <Box sx={{width: '100%'}}>
        {Component}
      </Box>
    </Grid>
  );
}

AssigmentType.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  payload: PropTypes.object,
  setPayload: PropTypes.func,
};