import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Card, CardContent, Container} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate, useParams} from "react-router-dom";
import Questionnaires from "./QuestionAverage/Questionnaires";
import {getAverage} from "../../tools/presentationRequest";

const QuestionAverage = props => {

  const [average, setAverage] = useState([]);

  const navigate = useNavigate();

  const params = useParams();

  const {testId, presentationId} = params;

  useEffect(async () => {
    setAverage(await searchAverage());
  }, []);


  const handleBack = () => {
    navigate(-1);
  }

  const searchAverage = async () => {
    const data = await getAverage(testId, presentationId);
    return data || [];
  }

  return (
    <Container sx={{mt: 2}}>
      <Box sx={{width: '100%'}}>
        <Button
          sx={{float: 'right'}}
          startIcon={<ArrowBackIcon/>}
          onClick={handleBack}
        >
          Regresar
        </Button>
        <h4>Consolidado de resultados</h4>
        <Card elevation={2} sx={{mt: 1}}>
          <CardContent>
            <h4 style={{marginBottom: '8px'}}>Secciones:</h4>
            <Questionnaires average={average}/>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

QuestionAverage.propTypes = {};

export default QuestionAverage;
