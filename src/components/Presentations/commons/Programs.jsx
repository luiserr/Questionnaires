import TableFront, {createHeader} from "../../commons/TableFront";
import {useData} from '../../hooks/presentationHook';
import React, {useState} from 'react';
import Box from "@mui/material/Box";

const headers = [
  createHeader('id', 'Id'),
  createHeader('code', 'Código'),
  createHeader('name', 'Nombre')
];

export default function Programs({data, setData, setPayload, payload, disabled, entity}) {

  const {resources: programs} = useData('programs', data, setData);
  const [codes, setCodes] = useState([]);

  // useEffect(() => {
  //   setCodes(programCodes());
  // }, [payload?.programs?.programs]);


  const handleCheck = (checked, row, all) => {
    let mySelectedPrograms = payload[entity]?.programs ?? [];
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
      [entity]: {
        ...payload[entity],
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
      [entity]: {
        ...payload[entity],
        programs: myPrograms
      }
    });
  };

  const selectedProgramsIds = () => {
    const myPrograms = payload[entity]?.programs ?? [];
    return myPrograms.map(programs => programs.id);
  };

  const selectedProgramsArray = selectedProgramsIds();

  return (<>
    <Box>
      <TableFront
        disabled={disabled}
        selectAll={false}
        headers={headers}
        handleSelect={handleCheck}
        handleSelectAll={handleCheckAll}
        title={'Programas de formación'}
        rowSelected={selectedProgramsArray}
        rows={programs}/>
    </Box>
  </>)
}