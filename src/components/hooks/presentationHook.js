import * as React from 'react';
import Roles from "../Presentations/Rol";
import Regionals from "../Presentations/Regionals";


export const useManualAssign = (index, data, setData, payload, setPayload) => {
  switch (index) {
    case 0:
      return <Roles
        data={data}
        setData={setData}
        payload={payload}
        setPayload={setPayload}
      />;
    case 1:
      return <Regionals
        data={data}
        setData={setData}
        payload={payload}
        setPayload={setPayload}
      />;
    case 2:
      return <h1>3</h1>;
    default:
      return <h1>Joder</h1>
  }
};