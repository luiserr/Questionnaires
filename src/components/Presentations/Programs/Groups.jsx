import TableFront, {createHeader} from "../../commons/TableFront";
import React, {useEffect, useState} from "react";
import * as PropTypes from 'prop-types';
import {getGroups} from "../../../tools/assignRequests";

const headers = [
  createHeader('id', 'Id'),
  createHeader('groupId', 'Id Ficha'),
  createHeader('idsecundario', 'Id secundario'),
  createHeader('programCode', 'Código de programa'),
  createHeader('name', 'Nombre')
];

export default function Groups({selectedPrograms, payload, setPayload, disabled}) {

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
          if (!groups.find(group => group.id === row.id)) {
            groups = [...groups, row];
          }
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

  const handleCheckAll = (checked) => {
    let myPrograms = payload?.programs?.programs ?? [];
    if (checked) {
      myPrograms = myPrograms.map((program) => {
        program['groups'] = groups.filter(group => group.programCode === program.code);
        return program;
      })
    } else {
      myPrograms = myPrograms.map((program) => {
        program['groups'] = [];
        return program;
      });
    }
    setPayload({
      ...payload,
      programs: {
        ...payload?.programs,
        programs: myPrograms
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
      disabled={disabled}
      headers={headers}
      rows={groups}
      rowSelected={selectedGroups()}
      handleSelectAll={handleCheckAll}
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