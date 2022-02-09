import React from 'react'
import {
    useState,
    useCallback,
    useRef,
    ReactNode,
    HtmlHTMLAttributes,
    useContext,
} from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { 
    Container, 
    Stack, 
    Typography, 
    Card, 
    FormControl,
    Divider,
    Button,
    TextField,
    Grid,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import Countries from './Countries'
import { Form } from './FormFunctions'
import validateInfo from './ValidateInfo'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SendIcon from '@mui/icons-material/Send'
import SelectAutoComplete from '../../components/Questionnaires/Assigns/Create/SelectAutoComplete';
import { titulada, complementaria, modalidad, regional } from '../../utils/assigns';


const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },
    mb3: {
        marginBottom: "1.3rem"
    },
    mb1: {
        marginBottom: ".85rem"
    },
    my1: {
        margin: ".85rem 0"
    }
}));

export default function FormAssign({ submitForm }) {

    const [open, setOpen] = useState(false);

    const [value, setValue] = React.useState(null);

    const { handleChange, handleSubmit, formData, errors } = Form(
        submitForm,
        validateInfo
      )

    const [expanded, setExpanded] = React.useState(true);

    const classes = useStyles();
    
    const handleExpandedChange = () => {
        setExpanded(!expanded);
    };
  
    return (

        <Container component='main' maxWidth='md'>

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                Crear una nueva asignación
                </Typography>
                <Button
                variant="contained"
                component={RouterLink}
                to="/test/presentation/1"
                startIcon={<ArrowBackIcon />}
                >
                Regresar
                </Button>
            </Stack>
            <Card sx={{ p: 2 }}>
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
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
                                    autoComplete='titulo'
                                    name='titulo'
                                    required
                                    fullWidth
                                    id='titulo'
                                    label='Titulo'
                                    autoFocus
                                    onChange={handleChange}
                                    value={formData.titulo || ''}
                                    />
                                </FormControl>
                                {errors.titulo && (
                                <p style={{ color: 'red' }}>{errors.titulo}</p>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Fecha de inicio"
                                        value={value}
                                        onChange={(newValue) => {
                                        setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker 
                                        label="Fecha final"
                                        value={value}
                                        onChange={(newValue) => {
                                        setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={classes.root}>
                                    <Accordion expanded={expanded} className={classes.mb3}>
                                        <AccordionSummary 
                                        onClick={ handleExpandedChange }
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                        <Typography>Tipo de curso</Typography>
                                        </AccordionSummary>
                                        <Divider />
                                        <AccordionDetails>
                                        
                                            <Grid container>
                                                <Grid
                                                item
                                                container
                                                justify="space-between"
                                                className={classes.my1}
                                                xs={12} md={6}
                                                >
                                                    <SelectAutoComplete 
                                                    data={titulada} 
                                                    />
                                                    <SelectAutoComplete 
                                                    data={complementaria}
                                                    />
                                                </Grid>
                                            </Grid>

                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion className={classes.mb3}>
                                        <AccordionSummary
                                        onClick={ handleExpandedChange }
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                        >
                                        <Typography>Modalidad</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <SelectAutoComplete 
                                                    data={modalidad} 
                                                    />
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion className={classes.mb3}>
                                        <AccordionSummary
                                        onClick={ handleExpandedChange }
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3a-content"
                                        id="panel3a-header"
                                        >
                                        <Typography>Regional y centro de formación</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <SelectAutoComplete 
                                                    data={regional} 
                                                    />
                                        </AccordionDetails>
                                    </Accordion>

                                </div>

                            </Grid>
                        </Grid>
                        <Button
                        type='submit'
                        variant="contained"
                        component={RouterLink}
                        to="/test/presentation/1"
                        startIcon={<SendIcon />}
                        sx={{ mt: 3, mb: 2 }}
                        >
                            Crear
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Container>
    );
}

const data = [
    { id: "check-1", title: "web" },
    { id: "check-2", title: "javascript" },
    { id: "check-3", title: "react" },
    { id: "check-4", title: "material ui" }
];
