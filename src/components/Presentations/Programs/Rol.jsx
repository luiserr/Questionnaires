import TableFront, {createHeader} from "../../commons/TableFront";
import {useData} from '../../hooks/presentationHook';
import React from 'react';

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'Nombre')
];

export default function Roles({data, setData, setPayload, payload}) {

  const {resources: roles} = useData('roles', data, setData)

  const handleCheck = (checked, row, all) => {
    let myRoles = payload?.programs?.roles ?? [];
    if (checked) {
      if (!myRoles.find(rol => rol.id === row.id)) {
        console.log(payload?.programs);
        myRoles.push(row.id);
      }
    } else {
      if (all) {
        myRoles = [];
      } else {
        myRoles = myRoles.filter(rol => rol.id !== row.id);
      }
    }
    setPayload({
      ...payload,
      programs: {
        ...payload.programs,
        roles: myRoles
      }
    })
  };

  return <TableFront
    headers={headers}
    handleSelect={handleCheck}
    title={'Roles del sistema'}
    rowSelected={payload?.programs?.roles}
    rows={roles}/>
}