import TableFront, {createHeader} from "../../commons/TableFront";
import {useData} from '../../hooks/presentationHook';
import React from 'react';

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'Nombre')
];

export default function Modalities({data, setData, setPayload, payload}) {

  const {resources: modalities} = useData('modalities', data, setData)

  const handleCheck = (checked, row) => {
    let myModalities = payload?.programs?.modalities ?? [];
    if (checked) {
      myModalities.push(row.id);
    } else {
      myModalities = myModalities.filter(modality => modality.id !== row.id);
    }
    setPayload({
      ...payload,
      programs: {
        ...payload.programs,
        roles: myModalities
      }
    })
  };

  return <TableFront
    headers={headers}
    handleSelect={handleCheck}
    title={'Modalidades'}
    rowSelected={payload?.programs?.modalities}
    rows={modalities}/>
}