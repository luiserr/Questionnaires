import TableFront, {createHeader} from "../../commons/TableFront";
import React, {useEffect, useState} from "react";
import * as PropTypes from 'prop-types';
import {getGroups} from "../../../tools/assignRequests";

const headers = [
  createHeader('id', 'Id'),
  createHeader('groupId', 'Id Ficha'),
  createHeader('groupCode', 'Código de grupo'),
  createHeader('programCode', 'Código de programa'),
  createHeader('name', 'Nombre')
];

export default function Groups({selectedPrograms, payload, setPayload}) {

  const [groups, setGroups] = useState([]);

  useEffect(async () => {
    if (selectedPrograms?.length) {
      const response = await getGroups(selectedPrograms);
      setGroups(response);
    }
  }, [selectedPrograms]);


  const handleCheck = (checked, row) => {
    let programs = payload?.programs?.programs ?? [];
    const newPrograms = programs.map((program) => {
      if (program.code === row.programCode) {
        let groups = program.groups ?? [];
        if (checked) {
          groups = [...groups, row];
        } else {
          groups = groups.filter(group => group.id !== row.id);
        }
        program['groups'] = groups;
      }
      return program;
    });
    setPayload({
      ...payload,
      programs: {
        ...payload?.programs,
        programs: newPrograms
      }
    });
  };

  const selectedGroups = () => {
    const myPrograms = payload?.programs?.programs ?? [];
    let myGroups = [];
    myPrograms.map(program => {
      const groups = program?.groups ?? [];
      myGroups = [...myGroups, ...groups];
    });
    return myGroups.map(group => group.id);
  };

  return (
    <TableFront
      headers={headers}
      rows={groups}
      rowSelected={selectedGroups()}
      title={'Fichas asociadas'}
      handleSelect={handleCheck}
    />
  );
}

Groups.propTypes = {
  selectedPrograms: PropTypes.array,
  payload: PropTypes.object.isRequired,
  setPayload: PropTypes.func.isRequired,
};