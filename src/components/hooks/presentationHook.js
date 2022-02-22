import * as React from 'react';
import {useEffect, useState} from 'react';
import Roles from "../Presentations/Rol";
import Index from "../Presentations/Regionals/index";
import {getAssets, getRoles} from "../../tools/assignRequests";


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
      return <Index
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

export const useData = (entity, data, setData) => {
  const [resources, setResources] = useState(data[entity] ?? []);
  useEffect(async () => {
    if (resources.length === 0) {
      const response = await getAssets(entity);
      setData({
        ...data,
        [entity]: response
      });
      setResources(response);
    }
  }, []);
  return {resources}
}