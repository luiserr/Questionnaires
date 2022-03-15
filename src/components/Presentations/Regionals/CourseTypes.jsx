import TableFront, {createHeader} from "../../commons/TableFront";
import {useData} from '../../hooks/presentationHook';
import React from 'react';

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'Nivel de formación'),
  createHeader('type', 'Tipo de programa'),
];

export default function CourseTypes({data, setData, setPayload, payload}) {

  const {resources: courseTypes} = useData('courseTypes', data, setData)

  const handleCheck = (checked, row, all) => {
    let myCourseTypes = payload?.regionals?.courseTypes ?? [];
    if (checked) {
      if (!myCourseTypes.find(type => type.id === row.id)) {
        myCourseTypes.push(row.id);
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

  return <TableFront
    headers={headers}
    handleSelect={handleCheck}
    handleSelectAll={handleCheckAll}
    title={'Tipos de cursos'}
    rowSelected={payload?.regionals?.courseTypes}
    rows={courseTypes}/>
}