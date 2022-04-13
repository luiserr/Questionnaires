import TableFront, {createHeader} from "../../commons/TableFront";
import {useData} from '../../hooks/presentationHook';
import React from 'react';

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'Nivel de formación'),
  createHeader('type', 'Tipo de programa'),
];

export default function CourseTypes({data, setData, setPayload, payload, disabled}) {

  const {resources: courseTypes} = useData('courseTypes', data, setData)

  const handleCheck = (checked, row, all) => {
    let myCourseTypes = payload?.regionals?.courseTypes ?? [];
    if (checked) {
      if (!myCourseTypes.find(type => type.id === row.id)) {
        myCourseTypes.push(row);
      }
    } else {
      myCourseTypes.filter(rol => rol.id !== row.id);
    }
    setPayload({
      ...payload,
      regionals: {
        ...payload.regionals,
        courseTypes: myCourseTypes
      }
    });
  };

  const handleCheckAll = (checked) => {
    let myCourseTypes = [];
    if (checked) {
      myCourseTypes = courseTypes;
    }
    setPayload({
      ...payload,
      regionals: {
        ...payload.regionals,
        courseTypes: myCourseTypes
      }
    });
  };

  const rowsSelected = ()=> {
    return payload?.regionals?.courseTypes?.map(item => item.id)
  }

  return <TableFront
    disabled={disabled}
    headers={headers}
    handleSelect={handleCheck}
    handleSelectAll={handleCheckAll}
    title={'Tipos de cursos'}
    rowSelected={rowsSelected()}
    rows={courseTypes}/>
}