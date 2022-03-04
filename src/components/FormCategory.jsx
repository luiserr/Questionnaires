import {Button, Grid, TextField} from "@mui/material";
import React, {useState} from "react";
import {saveCategory} from "../tools/categoryRequest";

export default function FormCategory({currentCategory, setVisible}) {
  const [category, setCategory] = useState({
    id: currentCategory?.id ?? null,
    name: currentCategory?.name ?? '',
    description: currentCategory?.description ?? ''
  });

  const handleChange = (key, value) => {
    setCategory({
      ...category,
      [key]: value
    })
  };

  const handleSave = async () => {
    const response = await saveCategory(category.id, category.name, category.description);
    if (response) {
      setVisible(false);
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <TextField
          inputProps={{
            maxLength: 30,
          }}
          label={'Nombre de la categoría'}
          fullWidth
          value={category.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          rows={3}
          label={'Descripción de la categoría'}
          fullWidth
          value={category.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          sx={{m: 2}}
          onClick={handleSave}
          color={'success'}
          variant={'contained'}>
          Guardar
        </Button>
        <Button
          sx={{m: 2}}
          onClick={() => setVisible(false)}
          color={'error'}
          variant={'outlined'}>
          Cancelar
        </Button>
      </Grid>
    </Grid>
  );
}