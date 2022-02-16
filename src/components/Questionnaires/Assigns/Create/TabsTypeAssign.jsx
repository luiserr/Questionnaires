import React from 'react'
import { 
    Box, 
    Typography, 
    Grid, 
    Card, 
    Checkbox, 
    CardContent, 
    FormControlLabel, 
    Tabs, 
    Tab, 
    FormGroup,
    List,
    ListItem,
    ListItemText,
    Switch,
    ListItemAvatar,
    Avatar
} from '@mui/material'
import { styled } from '@mui/material/styles'
import CenterTrainingWrapper from './CenterTraining/CenterTrainingWrapper'
import Regional from './Regional/Regional'
import Program from './Program/Program'
import PersonIcon from '@mui/icons-material/Person'
import FolderIcon from '@mui/icons-material/Folder'

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
        <Box sx={{ p: 3 }}>
            {children}
        </Box>
        )}
        </div>
    );
}

const a11yProps = (index) => ({ id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`,})

const TabsTypeAssign = ({typeAssign}) => {

    const [value, setValue] = React.useState(0);

    const { tipoCourse, modality, regional, centerTraining, program, rol } = typeAssign;

    console.log(tipoCourse);
    console.log(modality);
    console.log(regional);
    console.log(centerTraining);
    console.log(program);
    console.log(rol);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [checked, setChecked] = React.useState(['phone_verification']);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    if(Object.keys(typeAssign).length === 0 ) return null;

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
                
                        <Box sx={{ width: '100%' }}>
                            <Tabs variant="scrollable"
                            scrollButtons="auto"
                            textColor="primary"
                            indicatorColor="primary" value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Tipo de curso" {...a11yProps(0)} />
                                <Tab label="Modalidad" {...a11yProps(1)} />
                                <Tab label="Regional" {...a11yProps(2)} />
                                <Tab label="Centro de formación" {...a11yProps(3)} />
                                <Tab label="Código programa" {...a11yProps(4)} />
                                <Tab label="Rol" {...a11yProps(5)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                            
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <Typography variant="h6" gutterBottom>
                                    Titulada
                                    </Typography>

                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="AUXILIAR" />
                                        <FormControlLabel control={<Checkbox />} label="OPERARIO" />
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="TÉCNICO" />
                                        <FormControlLabel control={<Checkbox />} label="TECNÓLOGO" />
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="ESPECIALIZACIÓN TECNOLÓGICA" />
                                        <FormControlLabel control={<Checkbox />} label="PROFUNDIZACIÓN TÉCNICA" />
                                    </FormGroup>


                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Typography variant="h6" gutterBottom>
                                    Complementaria
                                    </Typography>

                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="CURSO ESPECIAL" />
                                        <FormControlLabel control={<Checkbox />} label="COMPLEMENTARIA VIRTUAL" />
                                    </FormGroup>
                                </Grid>                            
                            </Grid>

                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <List sx={{ width: '100%', maxWidth: 260, bgcolor: 'background.paper' }}>
                                    <ListItem sx={{ py: 2 }}>

                                        <ListItemAvatar>
                                            <FolderIcon fontSize="medium" />                                            
                                        </ListItemAvatar>

                                        <ListItemText
                                        primary="Presencial"
                                        primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary',
                                        gutterBottom: true,
                                        noWrap: true
                                        }}
                                        secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
                                        />
                                        <Switch
                                            edge="end"
                                            color="primary"
                                            onChange={handleToggle('1fa')}
                                            checked={checked.indexOf('1fa') !== -1}
                                        />
                                    </ListItem>
                                    <ListItem sx={{ py: 2 }}>
                                        <ListItemText
                                        primary="Virtual"
                                        primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary',
                                        gutterBottom: true,
                                        noWrap: true
                                        }}
                                        secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
                                        />
                                        <Switch
                                            edge="end"
                                            color="primary"
                                            onChange={handleToggle('2fa')}
                                            checked={checked.indexOf('2fa') !== -1}
                                        />
                                    </ListItem>
                                    <ListItem sx={{ py: 2 }}>
                                        <ListItemText
                                        primary="A distancia"
                                        primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary',
                                        gutterBottom: true,
                                        noWrap: true
                                        }}
                                        secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
                                        />
                                        <Switch
                                            edge="end"
                                            color="primary"
                                            onChange={handleToggle('3fa')}
                                            checked={checked.indexOf('3fa') !== -1}
                                        />
                                    </ListItem>
                                </List>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                            <Regional />
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                             <CenterTrainingWrapper />
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                <Program />
                            </TabPanel>
                            <TabPanel value={value} index={5}>
                            <List sx={{ width: '100%', maxWidth: 260, bgcolor: 'background.paper' }}>
                                    <ListItem sx={{ py: 2 }}>

                                        <ListItemAvatar>
                                            <PersonIcon fontSize="medium" />                                            
                                        </ListItemAvatar>

                                        <ListItemText
                                        primary="Administrador"
                                        primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary',
                                        gutterBottom: true,
                                        noWrap: true
                                        }}
                                        secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
                                        />
                                        <Switch
                                            edge="end"
                                            color="primary"
                                            onChange={handleToggle('1fa')}
                                            checked={checked.indexOf('1fa') !== -1}
                                        />
                                    </ListItem>
                                    <ListItem sx={{ py: 2 }}>

                                        <ListItemAvatar>
                                            <PersonIcon fontSize="medium" />                                            
                                        </ListItemAvatar>

                                        <ListItemText
                                        primary="Instructor"
                                        primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary',
                                        gutterBottom: true,
                                        noWrap: true
                                        }}
                                        secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
                                        />
                                        <Switch
                                            edge="end"
                                            color="primary"
                                            onChange={handleToggle('2fa')}
                                            checked={checked.indexOf('2fa') !== -1}
                                        />
                                    </ListItem>
                                    <ListItem sx={{ py: 2 }}>

                                        <ListItemAvatar>
                                            <PersonIcon fontSize="medium" />                                            
                                        </ListItemAvatar>

                                        <ListItemText
                                        primary="Aprendiz"
                                        primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary',
                                        gutterBottom: true,
                                        noWrap: true
                                        }}
                                        secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
                                        />
                                        <Switch
                                            edge="end"
                                            color="primary"
                                            onChange={handleToggle('3fa')}
                                            checked={checked.indexOf('3fa') !== -1}
                                        />
                                    </ListItem>
                                </List>
                            </TabPanel>
                        </Box>
                    
            </Grid>
        </Grid>
    </>
    );
}

export default TabsTypeAssign;