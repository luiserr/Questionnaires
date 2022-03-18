import TableFront, {createHeader} from "../commons/TableFront";
import React from 'react';

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'Nombre')
];

export default function CourseTypes({info, setInfo, listCourseTypes, payload, setPayload}) {

  const { data } = info;

  const handleCheck = (checked, row, all) => {
    let myCourseTypes = [...payload?.courseTypes];

    if (checked) {
      if (!myCourseTypes.find(courseType => courseType.id === row.id)) {
        myCourseTypes.push(row);
      }
    } else {
      myCourseTypes = myCourseTypes.filter(courseType => courseType.id !== row.id);
    }

    setPayload({
      ...payload,
      courseTypes: myCourseTypes
    })

    console.log(payload)
  }

  const handleCheckAll = (checked) => {
    let myCourseTypes = [];
    if (checked) {
      myCourseTypes = listCourseTypes;
    }
    setPayload({
      ...payload,
      courseTypes: myCourseTypes
    })

    console.log(payload)
  }

  return <TableFront
    headers={headers}
    handleSelect={handleCheck}
    handleSelectAll={handleCheckAll}
    title={'Tipos de cursos'}
    rows={listCourseTypes}/>
}