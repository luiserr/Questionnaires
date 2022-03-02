import notFound from '../img/notFound.jpg';
import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import React from 'react';


export default function NotFound() {

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/admin/surveys/`);
  }

  return (
    <Box>
      <Grid container sx={{maxHeight: '400px', mt: 4}}>
        <Grid item xs={4}/>
        <Grid item xs={4} alignItems={"center"}>
          <img
            style={{margin: '0 auto', width: '100%'}}
            src={notFound}
            alt={'Pagina no encontrada'}
            title={'Pagina no encontrada'}/>
        </Grid>
        <Grid item xs={12} sx={{textAlign: 'center'}}>
          <Typography variant={'h4'}>La pagina solicitada no es encontrada</Typography>
          <Button
            onClick={handleBack}
          >
            Click aquí para regresar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}