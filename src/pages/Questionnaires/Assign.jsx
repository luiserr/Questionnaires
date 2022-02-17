import React, {useState} from 'react'
import {Grid} from '@mui/material'
import PageTitleWrapper from '../../components/Questionnaires/Assigns/PageTitleWrapper'
import FormularioAssign from '../../components/Questionnaires/Assigns/Create/FormularioAssign'
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const Assign = () => {

  const [info, setInfo] = useState({});

  /*const [ typeCourse, setTypeCourse ] = useState({})
  const [ modality, setModality ] = useState({})
  const [ regional, setRegional ] = useState({})
  const [ centerTraining, setCenterTraining ] = useState({})
  const [ program, setProgram ] = useState({})
  const [ rol, setRol ] = useState({})*/

  return (
    <>
      <Grid>
        <PageTitleWrapper>
          <h4>
            Nueva asignación
          </h4>
          <Divider/>
        </PageTitleWrapper>
        <FormularioAssign/>
      </Grid>

    </>

  )
}

export default Assign