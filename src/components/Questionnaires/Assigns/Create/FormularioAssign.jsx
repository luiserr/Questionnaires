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
import { useParams } from 'react-router-dom'
import { useTest } from '../../../hooks/testHooks'

import { getTypeAssign, saveAssign } from '../../../../tools/assignRequests'

const FomularioAssign = () => {


    const { testId } = useParams();
    const { test } = useTest(testId);

    //console.log(testId);
    //console.log(test);

    /*Estado que almacena la respuesta del usario*/
    const [ typeAssign, setTypeAssign ] = useState({})

    /*Estado inicial*/
    const initial = {
        testId: testId,
        title: "",
        startDate: null,
        finishDate: null,
        presentationType: "Survey",
        tries: 1,
        anonymous: false,
        assignments: {
            centers: [],
            roles: [],
            programTraining: [],
            courseType: {
                titled: [],
                complementary: []
            },
            modality: {
                presencial: "",
                virtual: "",
                adistancia: ""
            },
            regional: []
        },
        error: false, 
        loading: false
    };

    /* Estado campos del formulario */
    const [ info, setInfo ] = useState(initial);

    useEffect(() => {

        //console.log('creando el componente');
        //consultando la api
        const consultarApi = async () => {
            const response = await getTypeAssign();
            setTypeAssign(response);
        }
        consultarApi()

    }, [])

    const handleSubmit = e => {
        e.preventDefault();
    
        if( info.title.trim() === "") {
            setInfo({
                ...info,
                error: true
            });
            return;
        }
    
        setInfo({
            ...info,
            error: false
        });

        /* Enviamos el formulario*/

        /*const sendData = async () => {
            const response = await saveAssign(info);
            setInfo(initial);
        }
        sendData();*/
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
            <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, mb: 3 }}
            >
            <Grid item xs={12}>

            {info.error && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Todos los campos son <strong>obligatorios</strong>
                </Alert>
                </Stack>
            )}

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
                                    value={info.title}
                                    onChange = {e => 
                                        setInfo({
                                            ...info,
                                            title: e.target.value
                                        })
                                    }
                                    />
                                </FormControl>

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
                                    value={info.tries}
                                    onChange = {e => 
                                        setInfo({
                                            ...info,
                                            tries: e.target.value
                                        })
                                    }
                                    />
                                </FormControl>

                            </Grid>

                            <Grid item xs={12}>

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
                                                value={info.startDate}
                                                onChange = {newValue => 
                                                    setInfo({
                                                        ...info,
                                                        startDate: newValue
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
                                                value={info.finishDate}
                                                onChange = {newValue => 
                                                    setInfo({
                                                        ...info,
                                                        finishDate: newValue
                                                    })
                                                }
                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                                />
                                            </LocalizationProvider>

                                        </FormControl>
                                    </Grid>
                                </Grid>
                                
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
                            info={info}
                            setInfo={setInfo}
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

            </Box>

        </Grid>

        
    </>
    );

}

export default FomularioAssign;