import TableFront, {createHeader} from "../../commons/TableFront";
import {useData} from '../../hooks/presentationHook';
import React from 'react';

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'Nombre')
];

export default function Roles({data, setData, setPayload, payload}) {

  const {resources: roles} = useData('roles', data, setData)

  const handleCheck = (checked, row) => {
    let myRoles = payload?.regionals?.roles ?? [];
    if (checked) {
      if (!myRoles.find(rol => rol.id === row.id)) {
        myRoles.push(row.id);
      }
    } else {
      myRoles = myRoles.filter(rol => rol.id !== row.id);
    }
    setPayload({
      ...payload,
      regionals: {
        ...payload.regionals,
        roles: myRoles
      }
    });
  };

  const handleSelectAll = (checked) => {
    let myRoles = [];
    if (checked) {
      myRoles = roles;
    }
    setPayload({
      ...payload,
      regionals: {
        ...payload.regionals,
        roles: myRoles
      }
    });
  };

  return <TableFront
    headers={headers}
    handleSelect={handleCheck}
    handleSelectAll={handleSelectAll}
    title={'Roles del sistema'}
    rowSelected={payload?.regionals?.roles}
    rows={roles}
  />
}