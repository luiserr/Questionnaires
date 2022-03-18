import TableFront, {createHeader} from "../commons/TableFront";
import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";

const headers = [
  createHeader('id', 'Id'),
  createHeader('code', 'Codigo'),
  createHeader('name', 'Nombre')
];

export default function Programs({info, setInfo, listPrograms, payload, setPayload}) {

  const { data } = info;

  const programs = data.find(e => e.typeAssigment === 'programs');

  const handleCheck = (checked, row, all) => {
    let myPrograms = [...payload?.programs];

    if (checked) {
      if (!myPrograms.find(program => program.id === row.id)) {
        myPrograms.push(row);
      }
    } else {
      myPrograms = myPrograms.filter(program => program.id !== row.id);
    }

    setPayload({
      ...payload,
      programs: myPrograms
    })

    console.log(payload)
  }

  const handleCheckAll = (checked) => {
    let myPrograms = [];
    if (checked) {
      myPrograms = listPrograms;
    }
    setPayload({
      ...payload,
      programs: myPrograms
    })

    console.log(payload)
  }

  const getConfiguration = () => {
    const configuration = programs?.configurationAssigment;
    if (typeof configuration !== 'undefined') {
      return JSON.parse(configuration);
    } 
    return [];
  };

  const myConfiguration = getConfiguration();

  return (<>
    <Box>
      <TableFront
        headers={headers}
        handleSelect={handleCheck}
        handleSelectAll={handleCheckAll}
        title={'Programas de formación'}
        rows={listPrograms}/>
    </Box>
  </>)
}