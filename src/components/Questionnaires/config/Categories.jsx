import React, {useState} from 'react';
import {Alert, Button, Grid} from "@mui/material";
import {attachCategory} from "../../../tools/categoryRequest";
import CategoriesList from "../../categoriesList";
import AddTaskIcon from '@mui/icons-material/AddTask';
import {useNavigate} from "react-router-dom";

export default function Categories({test}) {
  const [category, setCategory] = useState({
    id: test?.categoryId ?? null,
    name: test?.categoryName ?? ''
  });

  const navigation = useNavigate();

  const handleAttach = async (attach, currentCategory) => {
    const response = await attachCategory(test.id, currentCategory.id, attach);
    if (response) {
      if (!attach) {
        setCategory({
          id: null,
          name: ''
        })
      } else {
        setCategory({
          ...currentCategory
        })
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
        category.id ?
          <Alert
            onClose={() => handleAttach(false, category)}
          >
            Categoría de la encuesta: {category.name}
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