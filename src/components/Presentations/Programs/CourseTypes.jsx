import TableFront, {createHeader} from "../../commons/TableFront";
import {useData} from '../../hooks/presentationHook';
import React from 'react';

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'Nombre')
];

export default function CourseTypes({data, setData, setPayload, payload}) {

  const {resources: courseTypes} = useData('courseTypes', data, setData)

  const handleCheck = (checked, row, all) => {
    let myCourseTypes = payload?.programs?.courseTypes ?? [];
    if (checked) {
      if (!myCourseTypes.find(type => type.id === row.id)) {
        myCourseTypes.push(row.id);
      }
    } else {
      if (all) {
        myCourseTypes = [];
      } else {
        myCourseTypes.filter(rol => rol.id !== row.id);
      }
    }
    setPayload({
      ...payload,
      programs: {
        ...payload.programs,
        courseTypes: myCourseTypes
      }
    })
  };

  return <TableFront
    headers={headers}
    handleSelect={handleCheck}
    title={'Tipos de cursos'}
    rowSelected={payload?.programs?.courseTypes}
    rows={courseTypes}/>
}