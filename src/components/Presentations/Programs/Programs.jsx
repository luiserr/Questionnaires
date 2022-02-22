import TableFront, {createHeader} from "../../commons/TableFront";
import {useData} from '../../hooks/presentationHook';
import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Groups from "./Groups";

const headers = [
  createHeader('id', 'Id'),
  createHeader('code', 'Codigo'),
  createHeader('name', 'Nombre')
];

export default function Programs({data, setData, setPayload, payload}) {

  const {resources: regionals} = useData('programs', data, setData);
  const [codes, setCodes] = useState([]);

  const handleCheck = (checked, row) => {
    let mySelectedPrograms = payload?.programs?.programs ?? [];
    if(checked) {
      mySelectedPrograms = [...mySelectedPrograms, row];
    }else{
      mySelectedPrograms = mySelectedPrograms.filter(program => program.id !== row.id);
    }
    setCodes(mySelectedPrograms.map(program => program.code))
    setPayload({
      ...payload,
      programs: {
        ...payload.programs,
        programs: mySelectedPrograms
      }
    });
  };

  const selectedProgramsIds = () => {
    const myPrograms = payload?.programs.programs ?? [];
    return myPrograms.map(programs => programs.id);
  };

  const programCodes = () => {
    const myPrograms = payload?.programs.programs ?? [];
    return myPrograms.map(programs => programs.code);
  };

  const selectedProgramsArray = selectedProgramsIds();

  return (<>
    <Box>
      <TableFront
        headers={headers}
        handleSelect={handleCheck}
        title={'Programas de formación'}
        rowSelected={selectedProgramsArray}
        rows={regionals}/>
    </Box>
    <Box>
      <Groups
        payload={payload}
        setPayload={setPayload}
        selectedPrograms={codes}
      />
    </Box>
  </>)
}