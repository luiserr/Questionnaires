import * as React from 'react';
import {useEffect, useState} from 'react';
import Roles from "../Presentations/Rol";
import Regionals from "../Presentations/Regionals/index";
import {getAssets} from "../../tools/assignRequests";
import Programs from "../Presentations/Programs/index";
import Email from "../Presentations/Email";
import Groups from "../Presentations/Groups/index";
import Dates from "../Presentations/Dates/Dates";
import Users from "../Presentations/Users/index";


export const useManualAssign = (index, data, setData, payload, setPayload, disabled) => {
  switch (index) {
    case 0:
      return <Roles
        disabled={disabled}
        data={data}
        setData={setData}
        payload={payload}
        setPayload={setPayload}
      />;
    case 1:
      return <Regionals
        data={data}
        disabled={disabled}
        setData={setData}
        payload={payload}
        setPayload={setPayload}
      />;
    case 2:
      return <Programs
        data={data}
        disabled={disabled}
        setData={setData}
        payload={payload}
        setPayload={setPayload}
      />
    case 3:
      return <Email
        data={data}
        disabled={disabled}
        setData={setData}
        payload={payload}
        setPayload={setPayload}
      />
    case 4:
      return <Groups
        data={data}
        disabled={disabled}
        setData={setData}
        payload={payload}
        setPayload={setPayload}
      />
    case 5:
      return <Dates
        data={data}
        disabled={disabled}
        setData={setData}
        payload={payload}
        setPayload={setPayload}
      />
    case 6:
      return <Users
        data={data}
        disabled={disabled}
        setData={setData}
        payload={payload}
        setPayload={setPayload}
      />
    default:
      return <h1>Hola mundo</h1>
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