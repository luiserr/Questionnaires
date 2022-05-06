import React, {useEffect} from 'react';
import * as PropTypes from 'prop-types';
import {Alert, Button, Grid, TextField} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import CSVReader from "../commons/CSVReader";
import {getDomain, utf8Decode} from "../../utils/tools";
import {myAlert} from "../../utils/alerts";

export default function Email({payload, setPayload, disabled}) {

  useEffect(() => {
    const emails = payload?.emails ?? [];
    if (!emails.length) {
      setPayload({
        ...payload,
        emails: []
      })
    }
  }, []);

  const handleChange = (index, key, value) => {
    const newEmails = payload?.emails?.map((person, i) => {
      if (index === i) {
        person[key] = value;
      }
      return person;
    });
    setPayload({
      ...payload,
      emails: newEmails
    });
  }
  const handleNewPerson = () => {
    let emails = payload?.emails;
    const newPerson = {
      name: '',
      email: ''
    };
    emails = [...emails, newPerson];
    setPayload({
      ...payload,
      emails
    });
  };

  const handleRemove = (index) => {
    const emails = payload?.emails?.filter((person, i) => index !== i);
    setPayload({
      ...payload,
      emails
    });
  };

  const handleCSV = (rows = []) => {
    const emails = [];
    if (rows[0].length > 1000) {
      return myAlert('Ha excedido el límite máximo de correos. El límite es 1000 correos')
    }
    for (let i = 0; i < rows[0].length; i++) {
      if (!emails.find(email => email.email === rows[1][i])) {
        const name = rows[0][i];
        const email = rows[1][i];
        if (name !== '' && email !== '') {
          emails.push({
            name: utf8Decode(name),
            email
          });
        }
      }
    }
    setPayload({
      ...payload,
      emails
    })
  };

  const csvExample = () => getDomain('admin') + 'admin/surveys/example/emails.csv';

  return (
    <>
      {
        payload?.emails?.map((email, index) => (
          <Grid key={index} container spacing={2} sx={{mt: 2}}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                disabled={disabled}
                label={'Nombre'}
                value={email.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position={'start'}>
                      <AccountCircle/>
                    </InputAdornment>
                  )
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                disabled={disabled}
                label={'Correo electrónico'}
                value={email.email}
                onChange={(e) => handleChange(index, 'email', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position={'start'}>
                      <EmailIcon/>
                    </InputAdornment>
                  )
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                disabled={disabled}
                startIcon={<DeleteIcon/>}
                onClick={() => handleRemove(index)}
              />
            </Grid>
          </Grid>
        ))
      }
      <Grid container spacing={2} sx={{mt: 2}}>
        <Grid item xs={2}>
          <Button
            sx={{mt: 1, ml: 2}}
            variant={'outlined'}
            disabled={disabled}
            onClick={() => handleNewPerson()}
          >
            Agregar a otra persona
          </Button>
        </Grid>
        <Grid item xs={8} sx={{padding: '30px'}}>
          <Alert color={'info'} sx={{mb: 2}}>
            Seleccione un archivo CSV, el archivo debe tener, Máximo mil registros, dos columnas separadas por coma (,),
            la primera debe
            contener el nombre de las personas a la cual se les asignará la encuesta y la segunda columna su correo
            electrónico,
            clic <a href={csvExample()}>aquí</a> para descargar un ejemplo del archivo a subir
          </Alert>
          <CSVReader disabled={disabled} handleReader={handleCSV}/>
        </Grid>
      </Grid>
    </>
  );
}

Email.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  payload: PropTypes.object,
  setPayload: PropTypes.func,
}