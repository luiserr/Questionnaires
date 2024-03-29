import React, {useEffect, useState} from 'react';
import {Alert, Button, Grid} from "@mui/material";
import {attachCategory} from "../../../tools/categoryRequest";
import CategoriesList from "../../categoriesList";
import AddTaskIcon from '@mui/icons-material/AddTask';
import {useNavigate} from "react-router-dom";
import {SignalCellularNull} from "@mui/icons-material";

export default function Categories({test, setTest}) {
  const [category, setCategory] = useState({
    id: test?.categoryId ?? null,
    name: test?.categoryName ?? ''
  });

  useEffect(() => {
    setCategory({
      id: test?.categoryId ?? null,
      name: test?.categoryName ?? ''
    })
  }, [test.categoryId]);


  const navigation = useNavigate();

  const handleAttach = async (attach, currentCategory) => {
    const message = attach ? '¿Desea asociar esta categoría?' : '¿Desea desasociar esta categoría?';
    // eslint-disable-next-line no-restricted-globals
    if(confirm(message)) {
    const response = await attachCategory(test.id, currentCategory.id, attach);
    if (response) {
      if (!attach) {
        setTest({
          ...test,
          categoryId: null,
          categoryName: ''
        });
      } else {
        setTest({
          ...test,
          categoryId: currentCategory?.id,
          categoryName: currentCategory?.name
        });
        // setCategory({
        //   ...currentCategory
        // });
      }
    }
    }
  };

  const actions = [
    {
      title: 'Seleccionar categoría',
      component: (row) => <Button
        startIcon={<AddTaskIcon/>}
        alt={'Seleccionar'}
        title={'Seleccionar'}
        onClick={() => handleAttach(true, row)}
      />
    }
  ];

  return (
    <Grid item xs={12}>
      {
        test?.categoryId ?
          <Alert>
            Categoría de la encuesta: <strong>{category.name}</strong>
            <br/>
            <Button
              sx={{mt: 2}}
              color={'error'}
              variant={"outlined"}
              disabled={test?.presentations > 0}
              onClick={() => handleAttach(false, category)}
              >
              Desasociar
            </Button>
          </Alert> :
          <>
            <Button
              sx={{float: 'right'}}
              onClick={() => navigation(`/admin/surveys/categories`, {state: {test}})}>
              Gestionar categorías
            </Button>
            <h4>Seleccione una categoría</h4>
            <CategoriesList actions={actions}/>
          </>

      }
    </Grid>
  )
}