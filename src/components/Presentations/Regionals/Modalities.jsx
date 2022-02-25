import TableFront, {createHeader} from "../../commons/TableFront";
import {useData} from '../../hooks/presentationHook';
import React from 'react';

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'Nombre')
];

export default function Modalities({data, setData, setPayload, payload}) {

  const {resources: modalities} = useData('modalities', data, setData)

  const handleCheck = (checked, row, all) => {
    let myModalities = payload?.regionals?.modalities ?? [];
    if (checked) {
      if (!myModalities.find(modality => modality.id === row.id)) {
        myModalities.push(row);
      }
    } else {
      if (all) {
        myModalities = [];
      } else {
        myModalities = myModalities.filter(modality => modality.id !== row.id);
      }
    }
    setPayload({
      ...payload,
      regionals: {
        ...payload.regionals,
        modalities: myModalities
      }
    })
  };

  return <TableFront
    headers={headers}
    handleSelect={handleCheck}
    title={'Modalidades'}
    rowSelected={payload?.regionals?.modalities}
    rows={modalities}/>
}