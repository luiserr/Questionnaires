import React from 'react';
import TableFront, {createHeader} from "../commons/TableFront";

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'Nombre')
];

export default function Modalities({info, setInfo, listModalities, payload, setPayload}) {

  const { data } = info;

  const handleCheck = (checked, row, all) => {
    let myModalities = [...payload?.modalities];

    if (checked) {
      if (!myModalities.find(modality => modality.id === row.id)) {
        myModalities.push(row);
      }
    } else {
      myModalities = myModalities.filter(modality => modality.id !== row.id);
    }

    setPayload({
      ...payload,
      modalities: myModalities
    })
  };

  const handleCheckAll = (checked) => {
    let myModalities = [];
    if (checked) {
      myModalities = listModalities;
    }
    setPayload({
      ...payload,
      modalities: myModalities
    })

  }

  return <TableFront
    headers={headers}
    handleSelect={handleCheck}
    handleSelectAll={handleCheckAll}
    title={'Modalidades'}
    rows={listModalities}/>
}