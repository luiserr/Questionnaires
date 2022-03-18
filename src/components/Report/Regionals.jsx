import TableFront, {createHeader} from "../commons/TableFront";
import React from 'react';
import Box from "@mui/material/Box";

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'Nombre')
];

export default function Regionals({info, setInfo, listRegionals, payload, setPayload}) {

  const { data } = info;

  const handleCheck = (checked, row, all) => {
    let myRegionals = [...payload?.regionals];

    if (checked) {
      if (!myRegionals.find(regional => regional.id === row.id)) {
        myRegionals.push(row);
      }
    } else {
      myRegionals = myRegionals.filter(regional => regional.id !== row.id);
    }

    setPayload({
      ...payload,
      regionals: myRegionals
    })

    console.log(payload)
  }

  const handleCheckAll = (checked) => {
    let myRegionals = [];
    if (checked) {
      myRegionals = listRegionals;
    }
    setPayload({
      ...payload,
      regionals: myRegionals
    })

    console.log(payload)
  }

  return (<>
    <Box>
      <TableFront
        headers={headers}
        handleSelect={handleCheck}
        handleSelectAll={handleCheckAll}
        title={'Regionales'}
        rows={listRegionals}/>
    </Box>
  </>)
}