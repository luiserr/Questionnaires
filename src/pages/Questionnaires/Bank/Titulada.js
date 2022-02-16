import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup() {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="" control={<Radio />} label="Auxiliar" />
        <FormControlLabel value="" control={<Radio />} label="Operario" />
        <FormControlLabel value="" control={<Radio />} label="Técnico" />
        <FormControlLabel value="" control={<Radio />} label="Tecnólogo" />
        <FormControlLabel value="" control={<Radio />} label="Especialización Tecnológica" />
        <FormControlLabel value="" control={<Radio />} label="Profundización Técnica" />
      
 /*cursos*/
  <FormControlLabel value="" control={<Radio />} label="Complementaria Virtual" />
  <FormControlLabel value="" control={<Radio />} label="Curso Especial" />

  /*modalidad*/
  <FormControlLabel value="" control={<Radio />} label="Presencial" />
  <FormControlLabel value="" control={<Radio />} label="Virtual" />
  <FormControlLabel value="" control={<Radio />} label="A Distancia" />

  /*regional*/
  <FormControlLabel value="" control={<Radio />} label="Regional Amazonas" />
  <FormControlLabel value="" control={<Radio />} label="Regional Antioquia" />
  <FormControlLabel value="" control={<Radio />} label="Regional Arauca" />
  <FormControlLabel value="" control={<Radio />} label="Regional Atlántico" />
  <FormControlLabel value="" control={<Radio />} label="Regional Bolívar" />
  <FormControlLabel value="" control={<Radio />} label="Regional Boyacá" />
  <FormControlLabel value="" control={<Radio />} label="Regional Caldas" />
  <FormControlLabel value="" control={<Radio />} label="Regional Caquetá" />
  <FormControlLabel value="" control={<Radio />} label="Regional Casanare" />
  <FormControlLabel value="" control={<Radio />} label="Regional Cauca" />
  <FormControlLabel value="" control={<Radio />} label="Regional Cesar" />
  <FormControlLabel value="" control={<Radio />} label="Regional Chocó" />
  <FormControlLabel value="" control={<Radio />} label="Regional Córdoba" />
  <FormControlLabel value="" control={<Radio />} label="Regional Cundinamarca" />
  <FormControlLabel value="" control={<Radio />} label="Regional Distrito Capital" />
  <FormControlLabel value="" control={<Radio />} label="Regional Guainía" />
  <FormControlLabel value="" control={<Radio />} label="Regional Guajira" />
  <FormControlLabel value="" control={<Radio />} label="Regional Guaviare" />
  <FormControlLabel value="" control={<Radio />} label="Regional Huila" />
  <FormControlLabel value="" control={<Radio />} label="Regional Magdalena" />
  <FormControlLabel value="" control={<Radio />} label="Regional Meta" />
  <FormControlLabel value="" control={<Radio />} label="Regional Nariño" />
  <FormControlLabel value="" control={<Radio />} label="Regional Norte de Santander" />
  <FormControlLabel value="" control={<Radio />} label="Regional Putumayo" />
  <FormControlLabel value="" control={<Radio />} label="Regional Quindío" />
  <FormControlLabel value="" control={<Radio />} label="Regional Risaralda" />
  <FormControlLabel value="" control={<Radio />} label="Regional San Andrés" />
  <FormControlLabel value="" control={<Radio />} label="Regional Santander" />
  <FormControlLabel value="" control={<Radio />} label="Regional Sucre" />
  <FormControlLabel value="" control={<Radio />} label="Regional Tolima" />
  <FormControlLabel value="" control={<Radio />} label="Regional Valle" />
  <FormControlLabel value="" control={<Radio />} label="Regional Vaupés" />
  <FormControlLabel value="" control={<Radio />} label="Regional Vichada" />

  /*centros de formación*/
  <FormControlLabel value="" control={<Radio />} label="" />
  <FormControlLabel value="" control={<Radio />} label="" />
  <FormControlLabel value="" control={<Radio />} label="" />

  /*rol*/
  <FormControlLabel value="" control={<Radio />} label="Administrador de Centro" />
  

  </RadioGroup>
    </FormControl>
   ) }