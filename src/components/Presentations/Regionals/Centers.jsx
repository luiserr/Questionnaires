import TableFront, {createHeader} from "../../commons/TableFront";
import {useData} from '../../hooks/presentationHook';
import React, {useEffect, useState} from 'react';

const headers = [
  createHeader('id', 'Id'),
  createHeader('name', 'Nombre'),
  createHeader('regionalName', 'Regional')
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

  const handleCheck = (checked, row, all) => {
    if (selectedRegionals.length) {
      handleRegionalCenter(checked, row, all);
    } else {
      handleCenter(checked, row, all);
    }
  };

  const handleCenter = (checked, row, all) => {
    let myCenters = payload?.regionals.centers ?? [];
    if (checked) {
      if (!myCenters.find(center => center.id === row.id)) {
        myCenters.push(row);
      }
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

  const handleRegionalCenter = (checked, row, all) => {
    const currentRegionals = payload?.regionals?.regionals;
    setPayload({
      ...payload,
      regionals: {
        ...payload.regionals,
        regionals: currentRegionals.map(regional => {
          if (row.regionalId === regional.id) {
            const centers = regional.centers ?? [];
            if (checked) {
              if (!centers.find(center => center.id === row.id)) {
                regional['centers'] = [...centers, row];
              }
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
      regionals.map((regional) => {
        if (regional?.centers?.length) {
          centers = [...centers, ...regional?.centers];
        }
      });
    } else {
      centers = payload?.regionals?.centers ?? [];
    }
    return centers.map(center => center.id);
  }

  const handleCheckAll = (checked) => {
    if (payload?.regionals?.regionals?.length > 0) {
      let currentRegionals = payload?.regionals?.regionals;
      if (checked) {
        currentRegionals = currentRegionals.map((regional) => {
          regional['centers'] = centers.filter(center => center.regionalId === regional.id);
          return regional;
        });
      } else {
        currentRegionals = currentRegionals.map((regional) => {
          regional['centers'] = [];
        });
      }

      setPayload({
        ...payload,
        regionals: {
          ...payload.regionals,
          regionals: currentRegionals
        }
      });

    } else {
      if (checked) {
        setPayload({
          ...payload,
          regionals: {
            ...payload.regionals,
            centers
          }
        });
      } else {
        setPayload({
          ...payload,
          regionals: {
            ...payload.regionals,
            centers: []
          }
        });
      }
    }
  }

  return <TableFront
    headers={headers}
    handleSelect={handleCheck}
    handleSelectAll={handleCheckAll}
    title={'Centros de formación'}
    rowSelected={selectedCenters()}
    rows={trainingCenters}/>
}