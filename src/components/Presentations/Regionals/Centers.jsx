import TableFront, {createHeader} from "../../commons/TableFront";
import {useData} from '../../hooks/presentationHook';
import React, {useEffect, useState} from 'react';

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'nombre'),
  createHeader('departament', 'Departamento'),
  createHeader('city', 'Municipio'),
];

export default function Centers({data, setData, setPayload, payload, selectedRegionals = []}) {

  const {resources: centers} = useData('trainingCenters', data, setData);
  const [trainingCenters, setTrainingCenters] = useState(centers);

  useEffect(() => {
    if (centers.length) {
      setTrainingCenters(centers);
    }
  }, [centers]);

  useEffect(() => {
    if (selectedRegionals.length) {
      setTrainingCenters(centers.filter(center => selectedRegionals?.includes(center?.regionalId)))
    }
  }, [selectedRegionals]);

  const handleCheck = (checked, row) => {
    if (selectedRegionals.length) {
      handleRegionalCenter(checked, row);
    } else {
      handleCenter(checked, row);
    }
  };

  const handleCenter = (checked, row) => {
    let myCenters = payload?.regionals.centers ?? [];
    if (checked) {
      myCenters.push(row);
    } else {
      myCenters = myCenters.filter(center => center.id !== row.id);
    }
    setPayload({
      ...payload,
      regionals: {
        ...payload.regionals,
        centers: myCenters
      }
    });
  };

  const handleRegionalCenter = (checked, row) => {
    const currentRegionals = payload?.regionals?.regionals;
    setPayload({
      ...payload,
      regionals: {
        regionals: currentRegionals.map(regional => {
          if (row.regionalId === regional.id) {
            const centers = regional.centers ?? [];
            if (checked) {
              regional['centers'] = [...centers, row];
            } else {
              regional['centers'] = centers.filter(center => center.id !== row.id);
            }
          }
          return regional;
        })
      }
    });
  };

  const selectedCenters = () => {
    let centers = [];
    if (selectedRegionals.length) {
      const regionals = payload?.regionals?.regionals ?? [];
      regionals.map((regional) => centers = [...centers, ...regional.centers]);
    } else {
      centers = payload?.regionals?.centers ?? [];
    }
    return centers.map(center => center.id);
  }

  return <TableFront
    headers={headers}
    handleSelect={handleCheck}
    title={'Centros de formación'}
    rowSelected={selectedCenters()}
    rows={trainingCenters}/>
}