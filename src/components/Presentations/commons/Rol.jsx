import TableFront, {createHeader} from "../../commons/TableFront";
import {useData} from '../../hooks/presentationHook';
import React from 'react';

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'Nombre')
];

export default function Roles({data, setData, setPayload, payload, entity, disabled}) {

  const {resources: roles} = useData('roles', data, setData)

  const handleCheck = (checked, row) => {
    let myRoles = payload[entity]?.roles ?? [];
    if (checked) {
      if (!myRoles.find(rol => rol.id === row.id)) {
        myRoles.push(row);
      }
    } else {
      myRoles = myRoles.filter(rol => rol.id !== row.id);
    }
    setPayload({
      ...payload,
      [entity]: {
        ...payload[entity],
        roles: myRoles
      }
    });
  };

  const handleCheckAll = (checked) => {
    let myRoles = [];
    if (checked) {
      myRoles = roles;
    }
    setPayload({
      ...payload,
      [entity]: {
        ...payload[entity],
        roles: myRoles
      }
    });
  };

  const rowsSelected = ()=> {
    return payload[entity]?.roles?.map(item => item.id)
  }

  return <TableFront
    disabled={disabled}
    headers={headers}
    handleSelect={handleCheck}
    handleSelectAll={handleCheckAll}
    title={'Roles del curso'}
    rowSelected={rowsSelected()}
    rows={roles}/>
}