import React, {useState} from "react";
import {Box, Button, Card, CardContent} from "@mui/material";
import CategoriesList from "../../components/categoriesList";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormCategory from "../../components/FormCategory";
import {deleteCategory} from "../../tools/categoryRequest";
import {useNavigate} from "react-router-dom";

export default function Categories() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({});

  const navigation = useNavigate();

  const handleForm = (row = {}) => {
    setVisible(true);
    setCategory(row);
  };

  const handleDelete = async (row) => {
    const response = await deleteCategory(row.id);
    if (response) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  const actions = [
    {
      title: 'Editar',
      component: (row) =>
        <Button
          alt={'Editar'}
          title={'Editar'}
          onClick={() => handleForm(row)}
          startIcon={<EditIcon/>}
        />
    },
    {
      title: 'Eliminar',
      component: (row) =>
        <Button
          alt={'Eliminar'}
          title={'Eliminar'}
          startIcon={<DeleteIcon/>}
          onClick={() => handleDelete(row)}
        />
    }
  ];

  return (
    <Box sx={{width: '100%'}}>
      <Button
        sx={{float: 'right'}}
        startIcon={<ArrowBackIcon/>}
        onClick={() => navigation(-1)}
      >
        Regresar
      </Button>
      <h4>Categorias de encuestas</h4>
      <Card elevation={2} sx={{mt: 1}}>
        <CardContent>
          {
            visible ? <FormCategory currentCategory={category} setVisible={setVisible}/> :
              <>
                <Button onClick={() => setVisible(true)}>Crear categoría</Button>
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