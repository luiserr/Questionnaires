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


export default function Question() {

  const {state: {test: currentTest = null, question: currentQuestion = null}} = useLocation();
  const {sectionId, testId, questionId} = useParams();
  const {test} = useTest(testId, currentTest);
  const [question, setQuestion] = useState({
    title: '',
    description: '',
    questionType: '',
    private: true,
    ...currentQuestion
  });
  const [description, setDescription] = useState(question.description);
  const navigate = useNavigate();

  useEffect(async () => {
    if (questionId !== '_' && !currentQuestion) {
      const myQuestion = await findSection(questionId);
      setQuestion(myQuestion);
    }
  }, []);

  const QuestionComponent = useQuestion(question.questionType);

  const handleBack = () => {
    navigate(`/test/${testId}/section/${sectionId}`);
  };

  const handleChange = (questionType) => {
    setQuestion({
      ...question,
      questionType
    });
  };

  const handleSave = async (answers) => {
    const payload = {
      ...question,
      description,
      answers
    };
    const newSection = await saveQuestion(testId, sectionId, payload);
    if (newSection) {
      navigate(`/test/${testId}/section/${newSection.id}`, {state: {section: newSection}});
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
              <Box component="form" sx={{'& .MuiTextField-root': {m: 1}}}>
                <InputLabel id="questionTypeLabel">Tipo de pregunta</InputLabel>
                <Select
                  labelId="questionTypeLabel"
                  id="questionType"
                  label="Tipo de pregunta"
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
            <Grid item sx={12}>
              {QuestionComponent}
            </Grid>
          </Grid>
          <CardActions>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
}