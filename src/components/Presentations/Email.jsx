import React, {useEffect} from 'react';
import * as PropTypes from 'prop-types';
import {Button, Grid, TextField} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import CSVReader from "../commons/CSVReader";

export default function Email({payload, setPayload}) {

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
    for (let i = 0; i < rows[0].length; i++) {
      emails.push({
        name: rows[0][i],
        email: rows[1][i]
      });
    }
    setPayload({
      ...payload,
      emails
    })
  };

  return (
    <>
      {
        payload?.emails?.map((email, index) => (
          <Grid key={index} container spacing={2} sx={{mt: 2}}>
            <Grid item xs={4}>
              <TextField
                fullWidth
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
                label={'Correo electronico'}
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
            onClick={() => handleNewPerson()}
          >
            Agregar a otra persona
          </Button>
        </Grid>
        <Grid item xs={3} sx={{padding: '30px'}}>
          <CSVReader handleReader={handleCSV}/>
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