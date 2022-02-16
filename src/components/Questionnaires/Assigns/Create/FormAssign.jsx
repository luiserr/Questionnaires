import React from 'react'
import { 
    Alert,
    AlertTitle,
    FormControl,
    Button,
    TextField,
    Grid,
    Box,
    Stack,
    CircularProgress
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
import { useForm } from '../../../hooks/assign/useForm'

export default function FormAssign() {

    const [ state, setState ] = React.useState({
        title: '',
        dateInit: null,
        dateEnd: null,
        tries: 1,
        assign: {
            typeCourse: {
                "titulada": {
                    
                },
                "complementaria": {

                }
            },
            modality: '',
            regional: [],
            program: [],
            rol: [],
            user: [],
            anonimous: false
        },
        error: false, 
        loading: false
    });

    const [ stateTypeAssign, SelectTypeAssign ] = useSelectTypeAssign(
        'Seleccione tipo de asignación',
        'Asignar por: ',
        typeAssign
    );

    const [ stateTypeCourse, SelectTypeCourse ] = useSelectTypeAssign(
        'Seleccione tipo de curso',
        '',
        typeCourse
    );

    const [ stateTypeTitled, SelectTypeTitled ] = useSelectTypeAssign(
        'Seleccione tipo de titulada',
        '',
        titulada
    );

    const [ stateTypeComplementary, SelectTypeComplementary ] = useSelectTypeAssign(
        'Seleccione tipo de complementaria',
        '',
        complementaria
    );

    const [ stateTypeModality, SelectTypeModality ] = useSelectTypeAssign(
        'Seleccione tipo de modalidad',
        '',
        modality
    );

    const [ stateTypeRegional, SelectTypeRegional ] = useSelectTypeAssign(
        'Seleccione tipo de regional',
        '',
        regional
    );
    
    const [ stateTypeCenterTraining, SelectTypeCenterTraining ] = useSelectTypeAssign(
        'Seleccione tipo de centro de formación',
        '',
        centerTraining
    );

    const [ stateTypeProgram , SelectTypeProgram  ] = useSelectTypeAssign(
        'Seleccione tipo de programa',
        '',
        program 
    );

    const [ stateTypeRol , SelectTypeRol  ] = useSelectTypeAssign(
        'Seleccione tipo de rol',
        '',
        rol 
    );

    const [ stateTypeUser , SelectTypeUser ] = useSelectTypeAssign(
        'Seleccione usuario',
        '',
        user 
    );

    const [ stateTypeAnonimous , SelectTypeAnonimous ] = useSelectTypeAssign(
        'Usuario no registrado',
        '',
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
        <>

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
            sx={{ mt: 3 }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>

                    <Grid item xs={12} sm={3}>
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
                    </Grid >
                    <Grid item sx={{marginBottom:2}} xs={12} sm={9}>
                    <FormControl fullWidth>
                        <SelectTypeAssign />
                        {state.loading && <CircularProgress />}
                    </FormControl>                       
                    </Grid>
                </Grid>

                {stateTypeAssign == 'typeCourse' && (
                    <>
                        <Grid item sx={{marginBottom:2}} xs={12} sm={12}>
                        <FormControl fullWidth>
                            <SelectTypeCourse />
                            
                        </FormControl>                       
                        </Grid>

                        {(stateTypeCourse == 'titulada') && (
                            <>
                                <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <SelectTypeTitled />
                                </FormControl>                       
                                </Grid>
                                
                            </>
                        )}
                        {stateTypeCourse == 'complementaria' && (
                            <>
                                <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <SelectTypeComplementary />
                                </FormControl>                       
                                </Grid>
                            </>
                        )}

                    </>
                )}
                
                    {stateTypeAssign == 'modality' && (
                    <>
                        <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <SelectTypeModality />
                        </FormControl>                       
                        </Grid>
                    </>
                )}

                    {stateTypeAssign == 'regional' && (
                    <>
                        <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <SelectTypeRegional />
                        </FormControl>                       
                        </Grid>
                    </>
                )}

                {stateTypeAssign == 'centerTraining' && (
                    <>
                        <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <SelectTypeCenterTraining />
                        </FormControl>                       
                        </Grid>
                    </>
                )}

                {stateTypeAssign == 'program' && (
                    <>
                        <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <SelectTypeProgram />
                        </FormControl>                       
                        </Grid>
                    </>
                )}

                {stateTypeAssign == 'rol' && (
                    <>
                        <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <SelectTypeRol />
                        </FormControl>                       
                        </Grid>
                    </>
                )}

                {stateTypeAssign == 'user' && (
                    <>
                        <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <SelectTypeUser />
                        </FormControl>                       
                        </Grid>
                    </>
                )}

                {stateTypeAssign == 'anonimous' && (
                    <>
                        <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <SelectTypeAnonimous />
                        </FormControl>                       
                        </Grid>
                    </>
                )}

                <Button
                type='submit'
                variant="contained"
                startIcon={<SendIcon />}
                sx={{ mt: 3, mb: 2 }}
                >
                    Crear
                </Button>
            </Box>

        </>
    );
}