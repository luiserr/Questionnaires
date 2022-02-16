import React from 'react'
import { 
  Box, 
  Card, 
  CardContent,
  FormControl,
  Button,
  TextField,
  Grid,
  Typography,
  Toolbar,
  Stack,
  Alert,
  AlertTitle
} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import SendIcon from '@mui/icons-material/Send'
import useSelectTypeAssign from '../../../hooks/assign/useSelectTypeAssign'
import {
  typeAssign,
  typeCourse,
  titulada,
  complementaria,
  modality,
  regional,
  centerTraining,
  program,
  rol,
  user,
  anonimous
} from '../../../../utils/assign/assigns' 

const FormPresentation = () => {

  const [ state, setState ] = React.useState({
    title: '',
    dateInit: null,
    dateEnd: null,
    tries: 1,
    assign: '',
    typeCourse: '',
    modality: '',
    regional: '',
    program: '',
    rol: '',
    user: '',
    anonimous: false,
    error: false, 
    loading: false
  });

  const [ stateTypeAssign, SelectTypeAssign ] = useSelectTypeAssign(
    'Asignar por: ',
    typeAssign
  );

  const [ stateTypeCourse, SelectTypeCourse ] = useSelectTypeAssign(
    'Seleccione tipo de curso',
    typeCourse
  );

  const [ stateTypeTitled, SelectTypeTitled ] = useSelectTypeAssign(
    'Seleccione tipo de titulada',
    titulada
  );

  const [ stateTypeComplementary, SelectTypeComplementary ] = useSelectTypeAssign(
    'Seleccione tipo de complementaria',
    complementaria
  );

  const [ stateTypeModality, SelectTypeModality ] = useSelectTypeAssign(
    'Seleccione tipo de modalidad',
    modality
  );

  const [ stateTypeRegional, SelectTypeRegional ] = useSelectTypeAssign(
    'Seleccione tipo de regional',
    regional
  );

  const [ stateTypeCenterTraining, SelectTypeCenterTraining ] = useSelectTypeAssign(
    'Seleccione tipo de centro de formación',
    centerTraining
  );

  const [ stateTypeProgram , SelectTypeProgram  ] = useSelectTypeAssign(
    'Seleccione tipo de programa',
    program 
  );

  const [ stateTypeRol , SelectTypeRol  ] = useSelectTypeAssign(
    'Seleccione tipo de rol',
    rol 
  );

  const [ stateTypeUser , SelectTypeUser ] = useSelectTypeAssign(
    'Seleccione usuario',
    user 
  );

  const [ stateTypeAnonimous , SelectTypeAnonimous ] = useSelectTypeAssign(
    'Usuario no registrado',
    anonimous
  );

  //const [ program, isLoading ] = useFetch('http://sena.localhost:8000/api/assignQuestionnaires/Program', {});

  React.useEffect(()=>{
      
    if(stateTypeAssign === 'typeCourse') {
        console.log('typeCourse');
    }

  }, [stateTypeAssign, stateTypeCourse, stateTypeTitled, stateTypeComplementary, stateTypeModality, 
      stateTypeRegional, stateTypeCenterTraining, stateTypeProgram, stateTypeRol, stateTypeUser, stateTypeAnonimous ]);

  const handleSubmit = e => {
    e.preventDefault();

    if( [state.title, state.dateInit, state.dateEnd, state.tries, state.assign].includes('')) {
        setState({
            ...state,
            error: true
        });
        return;
    }

    console.log(state);

    setState({
        ...state,
        error: false
    });

  }

  const handleChangeTypeAssign = (e) => {
    const { value } = e.target.value;
    console.log(value);

    setState({
        ...state,
        assign: e.target.value
    })
  }

  return (
    
    <Card>

      {state.error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Todos los campos son <strong>obligatorios</strong>
        </Alert>
        </Stack>
      )}

      <Box
      component='form'
      noValidate
      onSubmit={handleSubmit}
      sx={{ mt: 3, mb: 3 }}
      >
        <CardContent>
          <Box display={{ md: 'block', lg: 'flex' }}>
            <Box flex={2} mr={{ md: 0, lg: '1em' }}>
              <Typography variant="h6" gutterBottom>
                Información Básica
              </Typography>

              <FormControl fullWidth sx={{mb:2}}>
                <TextField
                name='title'
                fullWidth
                id='title'
                label='Titulo'
                value={state.title}
                onChange = {e => 
                    setState({
                        ...state,
                        title: e.target.value
                    })
                }
                />
              </FormControl>

              <Box display={{ xs: 'block', sm: 'flex' }} sx={{mb:2}}>
                <Box
                    flex={1}
                    mr={{ xs: 0, sm: '0.5em' }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Fecha de inicio"
                        value={state.dateInit}
                        onChange = {newValue => 
                            setState({
                                ...state,
                                dateInit: newValue
                            })
                        }
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Box>
                <Box
                    flex={1}
                    ml={{ xs: 0, sm: '0.5em' }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker 
                        label="Fecha final"
                        value={state.dateEnd}
                        onChange = {newValue => 
                            setState({
                                ...state,
                                dateEnd: newValue
                            })
                        }
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>

              <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box
                flex={1}
                >

                  <FormControl fullWidth>
                    <TextField
                    name='tries'
                    fullWidth
                    id='tries'
                    label='Intentos'
                    type="number"
                    inputProps={{ min: 1}}
                    value={state.tries}
                    onChange = {e => 
                        setState({
                            ...state,
                            tries: e.target.value
                        })
                    }
                    />
                  </FormControl>

                </Box>

                <Box
                flex={2}
                ></Box>

              </Box>
            </Box>
            <Box
              flex={1}
              ml={{ xs: 0, lg: '1em' }}
              mt={{ xs: '1em', lg: 0 }}
            >

              <Typography variant="h6" gutterBottom>
                Tipo de asignación       
              </Typography>

              <FormControl fullWidth sx={{mb:2}}>
                <SelectTypeAssign />
              </FormControl>

              {stateTypeAssign === 'typeCourse' && (
                <>
                  <Grid item sx={{mb:2}} xs={12} sm={12}>
                    <FormControl fullWidth>
                      <SelectTypeCourse />
                    </FormControl>                       
                  </Grid>
                </>
              )}

              {(stateTypeAssign === 'typeCourse' && stateTypeCourse === 'titulada') && (
                <>
                  <Grid item sx={{mb:2}} xs={12} sm={12}>
                    <FormControl fullWidth>
                      <SelectTypeTitled />
                    </FormControl>                       
                  </Grid>                        
                </>
              )}

              {stateTypeAssign === 'typeCourse' && stateTypeCourse === 'complementaria' && (
                <>
                  <Grid item sx={{mb:2}} xs={12} sm={12}>
                    <FormControl fullWidth>
                      <SelectTypeComplementary />
                    </FormControl>                       
                  </Grid>
                </>
              )}
              
                
              {stateTypeAssign === 'modality' && (
                <>
                  <Grid item sx={{mb:2}} xs={12} sm={12}>
                    <FormControl fullWidth>
                      <SelectTypeModality />
                    </FormControl>                       
                  </Grid>
                </>
              )}

              {stateTypeAssign === 'regional' && (
                <>
                  <Grid item sx={{mb:2}} xs={12} sm={12}>
                    <FormControl fullWidth>
                      <SelectTypeRegional />
                    </FormControl>                       
                  </Grid>
                </>
              )}

              {stateTypeAssign === 'centerTraining' && (
                <>
                  <Grid item sx={{mb:2}} xs={12} sm={12}>
                    <FormControl fullWidth>
                      <SelectTypeCenterTraining />
                    </FormControl>                       
                  </Grid>
                </>
              )}

              {stateTypeAssign === 'program' && (
                <>
                  <Grid item sx={{mb:2}} xs={12} sm={12}>
                  <FormControl fullWidth>
                      <SelectTypeProgram />
                  </FormControl>                       
                  </Grid>
                </>
              )}

              {stateTypeAssign === 'rol' && (
                <>
                  <Grid item sx={{mb:2}} xs={12} sm={12}>
                    <FormControl fullWidth>
                      <SelectTypeRol />
                    </FormControl>                       
                  </Grid>
                </>
              )}

              {stateTypeAssign === 'user' && (
                <>
                  <Grid item sx={{mb:2}} xs={12} sm={12}>
                    <FormControl fullWidth>
                      <SelectTypeUser />
                    </FormControl>                       
                  </Grid>
                </>
              )}

              {stateTypeAssign === 'anonimous' && (
                <>
                  <Grid item sx={{mb:2}} xs={12} sm={12}>
                    <FormControl fullWidth>
                      <SelectTypeAnonimous />
                    </FormControl>                       
                  </Grid>
                </>
              )}

            </Box>
          </Box>
        </CardContent>
        <Toolbar>
          <Button
          type='submit'
          variant="contained"
          startIcon={<SendIcon />}
          sx={{ mt: 3, mb: 2 }}
          >
              Crear
          </Button>
        </Toolbar>
      </Box>
    </Card>
  )
}

export default FormPresentation