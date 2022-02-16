import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import JoditEditor from "jodit-react";
import React, {useEffect, useState} from "react";
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
import questionTypes from "../../const/questionTypes";
import useQuestion from "../../components/hooks/questionHook";
import validate from "../../tools/validateQuestion";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";


export default function Question() {

  const location = useLocation();
  const currentTest = location?.state?.test;
  const currentSection = location?.state?.section;
  const currentQuestion = location?.state?.question;

  const {sectionId, testId, questionId} = useParams();
  const {test, disabled} = useTest(testId, currentTest);

  const config = {
    readonly: disabled
  };

  const [question, setQuestion] = useState({
    id: null,
    title: '',
    description: '',
    questionType: '',
    private: true,
    answers: [],
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
    navigate(`/test/${testId}/section/${sectionId}`, {state: {test, section: currentSection}});
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
        navigate(`/test/${test.id}/section/${sectionId}`, {state: {test}});
      }
    }
  };

  return (
    <Box sx={{width: '100%'}}>
      <Breadcrumbs className="myBreadcrumb" aria-label="breadcrumb" sx={{marginBottom: '15px'}}>
        <Link>
          {test?.title}
        </Link>
        <Link>
          {currentSection?.title}
        </Link>
        <Link>
          {question?.title}
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
            Atrás
          </Button>
          <Grid container>
            <Grid item xs={10}>
              <Box component="form" sx={{marginTop: '1.5em'}}>
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
            <Grid item xs={10} sx={{marginTop: '1em'}}>
              <label>Descripción:</label>
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