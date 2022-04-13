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

  const handleCheck = (checked, row) => {
    let myCourseTypes = payload?.programs?.courseTypes ?? [];
    if (checked) {
      if (!myCourseTypes.find(type => type.id === row.id)) {
        myCourseTypes.push(row);
      }
    } else {
      myCourseTypes.filter(rol => rol.id !== row.id);
    }
    setPayload({
      ...payload,
      programs: {
        ...payload.programs,
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
      programs: {
        ...payload.programs,
        courseTypes: myCourseTypes
      }
    });
  };

  const rowsSelected = ()=> {
    return payload?.programs?.courseTypes?.map(item => item.id)
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