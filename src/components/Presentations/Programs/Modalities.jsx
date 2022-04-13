import TableFront, {createHeader} from "../../commons/TableFront";
import {useData} from '../../hooks/presentationHook';
import React from 'react';

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'Nombre')
];

export default function Modalities({data, setData, setPayload, payload, disabled}) {

  const {resources: modalities} = useData('modalities', data, setData)

  const handleCheck = (checked, row) => {
    let myModalities = payload?.programs?.modalities ?? [];
    if (checked) {
      if (!myModalities.find(modality => modality.id === row.id)) {
        myModalities.push(row);
      }
    } else {
        myModalities = myModalities.filter(modality => modality.id !== row.id);
    }
    setPayload({
      ...payload,
      programs: {
        ...payload.programs,
        modalities: myModalities
      }
    });
  };

  const handleCheckAll = (checked) => {
    let myModalities = [];
    if (checked) {
      myModalities = modalities;
    }
    setPayload({
      ...payload,
      programs: {
        ...payload.programs,
        modalities: myModalities
      }
    });
  }

  const rowsSelected = ()=> {
    return payload?.programs?.modalities?.map(item => item.id)
  }

  return <TableFront
    disabled={disabled}
    headers={headers}
    handleSelect={handleCheck}
    handleSelectAll={handleCheckAll}
    title={'Modalidades'}
    rowSelected={rowsSelected()}
    rows={modalities}/>
}