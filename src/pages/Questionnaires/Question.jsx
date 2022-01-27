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
import {findSection, saveQuestion} from "../../tools/testRequests";
import questionTypes from "../../const/questionTypes";
import useQuestion from "../../components/hooks/questionHook";
import validate from "../../tools/validateQuestion";


export default function Question() {

  const location = useLocation();
  const currentTest = location?.state?.test;
  const currentQuestion = location?.state?.question;

  const {sectionId, testId, questionId} = useParams();
  const {test} = useTest(testId, currentTest);
  const [question, setQuestion] = useState({
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
    if (questionId !== '_' && !currentQuestion) {
      const myQuestion = await findSection(questionId);
      setQuestion(myQuestion);
    }
  }, []);

  const QuestionComponent = useQuestion(question, answers, setAnswers);

  const handleBack = () => {
    navigate(`/test/${testId}/section/${sectionId}`);
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
      const newSection = await saveQuestion(testId, sectionId, payload);
      if (newSection) {
        navigate(`/test/${testId}/section/${newSection.id}`, {state: {section: newSection}});
      }
    }
  };

  return (
    <Box sx={{width: '100%'}}>
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
            <Grid item xs={10} sx={{marginTop: '1em'}}>
              <label>Descripción:</label>
              <JoditEditor
                value={description}
                onBlur={(text) => setDescription(text)}
              />
            </Grid>
            <Grid item xs={10}>
              <Box component="form" sx={{marginTop: '1.5em'}}>
                <InputLabel id="questionTypeLabel">Tipo de pregunta</InputLabel>
                <Select
                  labelId="questionTypeLabel"
                  id="questionType"
                  label="Tipo de pregunta"
                  sx={{width: '50%'}}
                  onChange={e => handleChange(e.target.value)}
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
            <Grid item xs={12}>
              {QuestionComponent}
            </Grid>
          </Grid>
          <CardActions>
            <Button onClick={handleSave}>Guardar</Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
}