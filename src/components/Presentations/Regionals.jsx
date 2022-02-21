import React, {useEffect, useState} from "react";
import {getRegionals} from "../../tools/assignRequests";
import TableFront from "../commons/TableFront";
import * as PropTypes from 'prop-types';

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'Id',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'city',
    numeric: false,
    disablePadding: false,
    label: 'Cuidad',
  },
  {
    id: 'departament',
    numeric: false,
    disablePadding: false,
    label: 'departament',
  },
];

export default function Regionals({data, setData, payload, setPayload}) {

  const [regionals, setRegionals] = useState(data?.regionals ?? []);

  useEffect(async () => {
    if (regionals.length === 0) {
      const response = await getRegionals();
      setData({
        ...data,
        regionals: response
      });
      setRegionals(response);
    }
  }, []);

  return (
    <>
      {
        regionals.length > 0 && <TableFront rows={regionals} headers={headCells}/>
      }
    </>
  );
}

Regionals.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  payload: PropTypes.object,
  setPayload: PropTypes.func,
};