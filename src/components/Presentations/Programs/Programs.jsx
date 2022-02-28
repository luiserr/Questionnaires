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

  const {resources: programs} = useData('programs', data, setData);
  const [codes, setCodes] = useState([]);

  // useEffect(() => {
  //   setCodes(programCodes());
  // }, [payload?.programs?.programs]);


  const handleCheck = (checked, row, all) => {
    let mySelectedPrograms = payload?.programs?.programs ?? [];
    if (checked) {
      if (!mySelectedPrograms.find(program => program.id === row.id)) {
        mySelectedPrograms = [...mySelectedPrograms, row];
      }
    } else {
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

  const handleCheckAll = (checked) => {
    let myPrograms = [];
    if (checked) {
      myPrograms = programs;
    }
    setPayload({
      ...payload,
      programs: {
        ...payload.programs,
        programs: myPrograms
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

  const myCodes = programCodes();

  return (<>
    <Box>
      <TableFront
        selectAll={false}
        headers={headers}
        handleSelect={handleCheck}
        handleSelectAll={handleCheckAll}
        title={'Programas de formación'}
        rowSelected={selectedProgramsArray}
        rows={programs}/>
    </Box>
    <Box>
      <Groups
        payload={payload}
        setPayload={setPayload}
        selectedPrograms={myCodes}
      />
    </Box>
  </>)
}