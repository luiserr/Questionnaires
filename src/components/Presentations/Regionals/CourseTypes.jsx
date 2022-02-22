import TableFront, {createHeader} from "../../commons/TableFront";
import {useData} from '../../hooks/presentationHook';
import React from 'react';

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'Nombre')
];

export default function CourseTypes({data, setData, setPayload, payload}) {

  const {resources: courseTypes} = useData('courseTypes', data, setData)

  const handleCheck = (checked, row) => {
    const myCourseTypes = payload?.regionals?.courseTypes ?? [];
    if (checked) {
      myCourseTypes.push(row.id);
    } else {
      myCourseTypes.filter(rol => rol.id !== row.id);
    }
    setPayload({
      ...payload,
      regionals: {
        ...payload.regionals,
        courseTypes: myCourseTypes
      }
    })
  };

  return <TableFront
    headers={headers}
    handleSelect={handleCheck}
    title={'Tipos de cursos'}
    rowSelected={payload?.regionals?.courseTypes}
    rows={courseTypes}/>
}