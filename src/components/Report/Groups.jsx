import TableFront, {createHeader} from "../commons/TableFront";
import React, {useEffect, useState} from "react";
import * as PropTypes from 'prop-types';

const headers = [
  createHeader('id', 'Id'),
  createHeader('groupId', 'Id Ficha'),
  createHeader('groupCode', 'Código de grupo'),
  createHeader('programCode', 'Código de programa'),
  createHeader('name', 'Nombre')
];

export default function Groups({info, setInfo, listGroups, payload, setPayload}) {

  const { data } = info;

  const handleCheck = (checked, row, all) => {
    let myGroups = [...payload?.groups];

    if (checked) {
      if (!myGroups.find(group => group.id === row.id)) {
        myGroups.push(row);
      }
    } else {
      myGroups = myGroups.filter(group => group.id !== row.id);
    }

    setPayload({
      ...payload,
      groups: myGroups
    })

    console.log(payload)
  }

  const handleCheckAll = (checked) => {
    let myGroups = [];
    if (checked) {
      myGroups = listGroups;
    }
    setPayload({
      ...payload,
      groups: myGroups
    })

    console.log(payload)
  }

  return (
    <TableFront
      headers={headers}
      handleSelectAll={handleCheckAll}
      handleSelect={handleCheck}
      title={'Fichas asociadas'}
      rows={listGroups}
    />
  );
}