import React, {useState} from 'react'
import {Box, Checkbox, FormControlLabel, FormGroup, Grid, Tab, Tabs, Typography} from '@mui/material'
import CenterTraining from './CenterTraining/CenterTraining'
import Regional from './Regional/Regional'
import Program from './Program/Program'
import {generarKey} from '../../../../utils/assign/assigns'

const TabPanel = (props) => {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          {children}
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index) => ({id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`,})

const TabsTypeAssign = ({typeAssign, info, setInfo}) => {

  const [value, setValue] = React.useState(0);

  const {typeCourse, modality, regional, centerTraining, program, rol} = typeAssign;
  const {assignments} = info;
  const [checked, setChecked] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleToggle = (c) => () => {
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);

  };


  if (Object.keys(typeAssign).length === 0) return null;

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

          <Box sx={{width: '100%'}}>
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

                    {typeCourse.titulada.map(item => (
                      <FormControlLabel key={generarKey() + item.description} control={
                        <Checkbox

                        />
                      } label={item.description}/>
                    ))}

                  </FormGroup>


                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Complementaria
                  </Typography>
                  {typeCourse.complementaria.map(item => (
                    <FormControlLabel key={generarKey() + item.description} control={<Checkbox/>}
                                      label={item.description}/>
                  ))}
                </Grid>
              </Grid>

            </TabPanel>
            <TabPanel value={value} index={1}>
              {modality.map(item => (
                <FormControlLabel
                  key={generarKey() + item.description}
                  control={<Checkbox/>}
                  label={item.description}
                />
              ))}
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Regional
                regional={regional}
              />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <CenterTraining
                centerTraining={centerTraining}
              />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Program
                program={program}
              />
            </TabPanel>
            <TabPanel value={value} index={5}>
              {rol.map(item => (
                <div key={generarKey() + item.description}>
                  <FormControlLabel
                    control={<Checkbox/>}
                    label={item.nombreDeCarrera}
                  />
                  <br/>
                </div>
              ))}
            </TabPanel>
          </Box>

        </Grid>
      </Grid>
    </>
  );
}

export default TabsTypeAssign;