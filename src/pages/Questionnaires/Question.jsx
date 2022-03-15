import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import JoditEditor from "jodit-react";
import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import {useTest} from "../../components/hooks/testHook";
import {findQuestion, saveQuestion} from "../../tools/testRequests";
import questionTypes, {MATRIX, MULTIPLE, OPEN} from "../../const/questionTypes";
import useQuestion from "../../components/hooks/questionHook";
import validate from "../../tools/validateQuestion";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import {FormControl, FormControlLabel, Switch} from "@mui/material";
import {v4} from "uuid";
import {validations} from "../../const/validations";
import userContext from "../../context/userContext";


export default function Question() {

  const location = useLocation();
  const currentTest = location?.state?.test;
  const currentSection = location?.state?.section;
  const currentQuestion = location?.state?.question;

  const {sectionId, testId, questionId} = useParams();
  const user = useContext(userContext);
  const {test, disabled} = useTest(testId, currentTest, user);

  const config = {
    readonly: disabled
  };

  const [question, setQuestion] = useState({
    id: null,
    title: '',
    description: '',
    questionType: '',
    private: false,
    answers: [],
    conditional: false,
    validation: 'none',
    ...currentQuestion
  });
  const [description, setDescription] = useState(question.description);
  const [answers, setAnswers] = useState(question.answers);
  const navigate = useNavigate();

  useEffect(async () => {
    if (test && questionId !== '_') {
      const myQuestion = await findQuestion(testId, sectionId, questionId);
      setAnswers(myQuestion.answers);
      setQuestion(myQuestion);
      setDescription(myQuestion.description);
    }
  }, [test]);

  const QuestionComponent = useQuestion(question, answers, setAnswers, disabled);

  const handleBack = () => {
    navigate(`/admin/surveys/test/${testId}/section/${sectionId}`, {state: {test, section: currentSection}});
  };

  const handleChange = (questionType) => {
    setQuestion({
      ...question,
      questionType
    });
  };

  const handleSave = async () => {
    const payload = {
      ...question,
      description,
      answers
    };
    if (validate(payload)) {
      const newQuestion = await saveQuestion(test.id, sectionId, payload);
      if (newQuestion) {
        navigate(`/admin/surveys/test/${test.id}/section/${sectionId}`, {state: {test}});
      }
    }
  };

  return (
    <Box sx={{width: '100%'}}>
      <Breadcrumbs className="myBreadcrumb" aria-label="breadcrumb" sx={{marginBottom: '15px'}}>
        <Link alt={test?.title} title={test?.title}>
          {test?.title?.length > 30 ? `${test?.title?.substring(0, 30)} ...` : test?.title}
        </Link>
        <Link alt={currentSection?.title} title={currentSection?.title}>
          {currentSection?.title?.length > 30 ? `${currentSection?.title?.substring(0, 30)} ...` : currentSection?.title}
        </Link>
        <Link alt={question?.title} title={question?.title}>
          {question?.title?.length > 30 ? `${question?.title?.substring(0, 30)} ...` : question?.title}
        </Link>
      </Breadcrumbs>
      <h4>
        Configuración de preguntas
      </h4>
      <Card>
        <CardContent>
          <Button
            startIcon={<ArrowBackIcon/>}
            variant={"outlined"}
            onClick={() => handleBack()}
            sx={{float: 'right'}}
          >
            Regresar
          </Button>
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <Box component="form" sx={{mt: 1}}>
                <InputLabel id="questionTypeLabel">Tipo de pregunta</InputLabel>
                <Select
                  disabled={disabled || question.id !== null}
                  labelId="questionTypeLabel"
                  id="questionType"
                  label="Tipo de pregunta"
                  sx={{width: '50%'}}
                  value={question.questionType}
                  onChange={e => handleChange(e.target.value)}
                  size="small"
                >
                  {questionTypes.map((question) => <MenuItem
                      key={question.key}
                      value={question.key}>
                      {question.label}
                    </MenuItem>
                  )}
                </Select>
              </Box>
            </Grid>
            <Grid item xs={10}>
              <FormControlLabel control={<Switch
                checked={question?.private === 1 || question?.private}
                onChange={() => setQuestion({
                  ...question,
                  private: !question.private
                })}
              />} label="¿pertenece al banco de preguntas?"/>
            </Grid>
            {![OPEN, MULTIPLE, MATRIX].includes(question.questionType) &&
              <Grid item xs={10}>
                <FormControlLabel control={<Switch
                  checked={question?.conditional === 1 || question?.conditional}
                  onChange={() => setQuestion({
                    ...question,
                    conditional: !question.conditional
                  })}
                />} label="¿Esta pregunta es condición para otra pregunta?"/>
              </Grid>
            }
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="operator">Tipo de validación</InputLabel>
                <Select
                  labelId="answer"
                  id="demo-simple-select"
                  label="Tipo de validación"
                  fullWidth
                  value={question?.validation ? question?.validation : 'none'}
                  onChange={(e) => setQuestion({...question, validation: e.target.value})}
                >

                  {
                    validations?.map((validation) =>
                      <MenuItem key={v4()} value={validation.id}>{validation.label}</MenuItem>
                    )
                  }
                < /Select>
              </FormControl>
            </Grid>
            <Grid item xs={10} sx={{marginTop: '1em'}}>
              <label>Descripción *</label>
              <JoditEditor
                config={config}
                value={description}
                onBlur={(text) => setDescription(text)}
              />
            </Grid>
            <Grid item xs={12}>
              {QuestionComponent}
            </Grid>
          </Grid>
          <CardActions>
            <Button disabled={disabled} variant="contained" onClick={handleSave}>Guardar</Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
}