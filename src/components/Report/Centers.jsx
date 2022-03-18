import TableFront, {createHeader} from "../commons/TableFront";
import React, {useEffect, useState} from 'react';

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'Nombre'),
  createHeader('regionalName', 'Regional')
];

export default function Centers({info, setInfo, listCenters, payload, setPayload}) {

  const { data } = info;

  const handleCheck = (checked, row, all) => {
    let myCenters = [...payload?.centers];

    if (checked) {
      if (!myCenters.find(center => center.id === row.id)) {
        myCenters.push(row);
      }
    } else {
      myCenters = myCenters.filter(center => center.id !== row.id);
    }

    setPayload({
      ...payload,
      centers: myCenters
    })

    console.log(payload)
  }

  const handleCheckAll = (checked) => {
    let myCenters = [];
    if (checked) {
      myCenters = listCenters;
    }
    setPayload({
      ...payload,
      centers: myCenters
    })

    console.log(payload)
  }

  return <TableFront
    headers={headers}
    handleSelect={handleCheck}
    handleSelectAll={handleCheckAll}
    title={'Centros de formación'}
    rows={listCenters}/>
}