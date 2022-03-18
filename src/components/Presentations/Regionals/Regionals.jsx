import TableFront, {createHeader} from "../../commons/TableFront";
import {useData} from '../../hooks/presentationHook';
import React from 'react';
import Centers from "./Centers";
import Box from "@mui/material/Box";

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'Nombre'),
];

export default function Regionals({data, setData, setPayload, payload}) {

  const {resources: regionals} = useData('regionals', data, setData)

  const handleCheck = (checked, row, all) => {
    let myRegionals = payload?.regionals?.regionals ?? [];
    if (checked) {
      row['centers'] = handleCenters([...myRegionals, row]);
      if (!myRegionals.find(regional => regional.id === row.id)) {
        myRegionals.push(row);
      }
    } else {
      myRegionals = myRegionals.filter(regional => regional.id !== row.id);
    }
    setPayload({
      ...payload,
      regionals: {
        ...payload.regionals,
        regionals: myRegionals,
        centers: []
      }
    });
  };

  const handleCheckAll = (checked) => {
    let myRegionals = [];
    if (checked) {
      myRegionals = regionals;
    }
    setPayload({
      ...payload,
      regionals: {
        ...payload.regionals,
        regionals: myRegionals,
        centers: []
      }
    });
  };

  const handleCenters = (myRegionals) => {
    let myCenters = payload?.regionals?.centers ?? [];
    if (myCenters.length) {
      return myCenters.filter(center => myRegionals
        .map(regional => regional.id)
        .includes(center?.regionalId)
      );
    }
    return [];
  }

  const selectedRegionals = () => {
    const myRegionals = payload?.regionals.regionals ?? [];
    return myRegionals.map(regional => regional.id);
  };

  const mySelectedRegionals = selectedRegionals();

  return (<>
    <Box>
      <TableFront
        headers={headers}
        handleSelect={handleCheck}
        handleSelectAll={handleCheckAll}
        title={'Regionales'}
        rowSelected={mySelectedRegionals}
        rows={regionals}/>
    </Box>
    <Box>
      <Centers
        payload={payload}
        setPayload={setPayload}
        setData={setData}
        data={data}
        selectedRegionals={mySelectedRegionals}
      />
    </Box>
  </>)
}