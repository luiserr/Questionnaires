import React, { useState, useEffect } from 'react'
import { 
    Box, 
    Card, 
    CardContent,
    FormControl,
    FormControlLabel,
    Radio,
    FormLabel,
    RadioGroup,
    Button,
    TextField,
    Grid,
    Typography,
    Toolbar,
    Stack,
    Alert,
    AlertTitle,
    Divider,
    CardHeader
} from '@mui/material'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import SendIcon from '@mui/icons-material/Send'
import TabsTypeAssign from './TabsTypeAssign'

import { getTypeAssign } from '../../../../tools/assignRequests'

const FomularioAssign = () => {

    const [ typeAssign, setTypeAssign ] = useState({})

    const [ state, setState ] = useState({
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

    useEffect(() => {

        console.log('creando el componente');

        const consultarApi = async () => {
            const response = await getTypeAssign();
            setTypeAssign(response);
        }
        consultarApi()

    }, [])

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

    return (
    <>

        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
        >
            <Grid item xs={12}>

                <Card sx={{ mt: 3, mb: 2 }}>
                    <CardHeader title="Información Básica" />
                    <Divider />
                    <CardContent>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                Titulo
                                </Typography>

                                <FormControl fullWidth sx={{mb:2}}>
                                    <TextField
                                    name='title'
                                    fullWidth
                                    id='title'
                                    label='Ingrese un titulo'
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
                            
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                Fechas de asignación
                                </Typography>

                                <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="stretch"
                                spacing={3}
                                >
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>

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

                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>

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

                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                Número de intentos
                                </Typography>
                                <FormControl fullWidth>
                                    <TextField
                                    name='tries'
                                    fullWidth
                                    id='tries'
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
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography variant="h6">
                                Estado
                                </Typography>

                                <FormControl component="fieldset">
                                    <RadioGroup row aria-label="stateAssign" name="row-radio-buttons-group">
                                        <FormControlLabel value="Sin asignar" control={<Radio />} label="Sin asignar" />
                                        <FormControlLabel value="Asignada" control={<Radio />} label="Asignada" />
                                        <FormControlLabel value="Terminada" control={<Radio />} label="Terminada" />
                                        <FormControlLabel value="Cancelada" control={<Radio />} label="Cancelada" />
                                    </RadioGroup>
                                </FormControl>

                            </Grid>

                        </Grid>

                    </CardContent>
                </Card>

                <Card sx={{ mt: 3, mb: 2 }}>
                    <CardHeader title="Tipo de asignación" />
                    <Divider />
                    <CardContent>
                        <TabsTypeAssign 
                            typeAssign={typeAssign}
                        />
                    </CardContent>
                </Card>

                <Grid container justifyContent="flex-end">
                    <Button
                    type='submit'
                    variant="contained"
                    startIcon={<SendIcon />}
                    sx={{ mt: 3, mb: 2 }}
                    >
                        Crear
                    </Button>
                </Grid>

            </Grid>

        </Grid>

        
    </>
    );

}

export default FomularioAssign;