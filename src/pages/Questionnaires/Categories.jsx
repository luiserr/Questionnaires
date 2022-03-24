import React, {useState} from "react";
import {Box, Button, Card, CardContent, IconButton} from "@mui/material";
import CategoriesList from "../../components/categoriesList";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormCategory from "../../components/FormCategory";
import {deleteCategory} from "../../tools/categoryRequest";
import {useLocation, useNavigate} from "react-router-dom";

export default function Categories() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({});

  const navigation = useNavigate();
  const location = useLocation();

  const handleForm = (row = {}) => {
    setVisible(true);
    setCategory(row);
  };

  const handleDelete = async (row) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('¿Esta seguro que desea eliminar esta categoria?')) {
      const response = await deleteCategory(row.id);
      if (response) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    }
  };

  const handleBack = () => {
    const test = location?.state?.test;
    if (test) {
      return navigation(`/admin/surveys/test/${test.id}`, {state: {step: 1}});
    }
    return navigation(-1);
  };

  const actions = [
    {
      title: 'Editar',
      component: (row) =>
        <IconButton
          alt={'Editar'}
          title={'Editar'}
          onClick={() => handleForm(row)}
        >
          <EditIcon/>
        </IconButton>
    },
    {
      title: 'Eliminar',
      component: (row) =>
        <IconButton
          disabled={row.tests > 0}
          alt={'Eliminar'}
          title={'Eliminar'}
          onClick={() => handleDelete(row)}
        >
          <DeleteIcon/>
        </IconButton>
    }
  ];

  return (
    <Box sx={{width: '100%'}}>
      <Button
        sx={{float: 'right'}}
        startIcon={<ArrowBackIcon/>}
        onClick={handleBack}
      >
        Regresar
      </Button>
      <h4>Categorías de encuestas</h4>
      <Card elevation={2} sx={{mt: 1}}>
        <CardContent>
          {
            visible ? <FormCategory currentCategory={category} setVisible={setVisible}/> :
              <>
                <Button onClick={() => handleForm()}>Crear categoría</Button>
                {
                  !loading && <CategoriesList actions={actions}/>
                }
              </>
          }
        </CardContent>
      </Card>
    </Box>
  );
}