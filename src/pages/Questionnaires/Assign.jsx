import React, { useState, useEffect } from 'react'
import { 
    Grid
} from '@mui/material'
import PageTitleWrapper from '../../components/Questionnaires/Assigns/PageTitleWrapper'
import PageTitle from '../../components/Questionnaires/Assigns/PageTitle'
import FormularioAssign from '../../components/Questionnaires/Assigns/Create/FormularioAssign'

const Assign = () => {

  const [ info, setInfo ] = useState({});

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
            <PageTitle
            heading="Nueva asignación"
            subHeading="Formulario encargado de crear y asignar una encuesta."
            to="/test/presentation/1" />
          </PageTitleWrapper>
          <FormularioAssign />

        </Grid>
        
      </>
    
  )
}

export default Assign