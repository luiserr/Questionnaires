import TableFront, {createHeader} from "../../commons/TableFront";
import {useData} from '../../hooks/presentationHook';
import React from 'react';

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'Nombre')
];

export default function Roles({data, setData, setPayload, payload, disabled}) {

  const {resources: roles} = useData('roles', data, setData)

  const handleCheck = (checked, row) => {
    let myRoles = payload?.programs?.roles ?? [];
    if (checked) {
      if (!myRoles.find(rol => rol.id === row.id)) {
        myRoles.push(row);
      }
    } else {
      myRoles = myRoles.filter(rol => rol.id !== row.id);
    }
    setPayload({
      ...payload,
      programs: {
        ...payload.programs,
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
      programs: {
        ...payload.programs,
        roles: myRoles
      }
    });
  };

  const rowsSelected = ()=> {
    return payload?.programs?.roles?.map(item => item.id)
  }

  return <TableFront
    disabled={disabled}
    headers={headers}
    handleSelect={handleCheck}
    handleSelectAll={handleCheckAll}
    title={'Roles del sistema'}
    rowSelected={rowsSelected()}
    rows={roles}/>
}