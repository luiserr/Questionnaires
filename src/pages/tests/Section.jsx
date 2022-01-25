import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import JoditEditor from "jodit-react";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QuestionList from "../../components/tests/config/QuestionList";
import CardActions from "@mui/material/CardActions";
import SaveIcon from '@mui/icons-material/Save';
import {findSection, saveSection} from "../../tools/testRequests";
import Box from "@mui/material/Box";

export default function Section() {

  const location = useLocation();
  const navigate = useNavigate();
  const {testId, sectionId} = useParams();

  const [section, setSection] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [numberQuestions, setNumberQuestions] = useState(0);

  useEffect(async () => {
    let currentSection = location?.state?.section || null;
    if (sectionId !== '_' && !currentSection) {
      currentSection = await findSection(sectionId);
    }
    if (currentSection) {
      setSection(currentSection);
      setTitle(currentSection.title || '');
      setDescription(currentSection.description || '');
      setNumberQuestions(currentSection.numberQuestions || 0);
    }
  }, []);


  const handleBack = () => {
    navigate(`/test/${testId}`, {state: {step: 1}});
  };

  const handleSave = async () => {
    const newSection = await saveSection(testId, section, title, description, numberQuestions);
    if (newSection) {
      navigate(`/test/${testId}/section/${newSection.id}`, {state: {section: newSection}});
    }
  };

  return (
    <Box sx={{width: '100%'}}>
      <h4>
        Configuración de secciones
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
              <Box component="form" sx={{'& .MuiTextField-root': {m: 1}}}>
                <TextField
                  fullWidth
                  id="title"
                  label="Titulo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="outlined"
                />
              </Box>

            </Grid>
            <Grid item xs={6}>
              <Box component="form" sx={{'& .MuiTextField-root': {m: 1}}}>
                <TextField
                  fullWidth
                  id="title"
                  label="Numero de preguntas"
                  value={numberQuestions}
                  onChange={(e) => setNumberQuestions(e.target.value)}
                  variant="outlined"
                />
              </Box>
            </Grid>
            <Grid item xs={10} sx={{marginTop: '1em'}}>
              <label>Descripción:</label>
              <JoditEditor
                value={description}
                onBlur={(text) => setDescription(text)}
              />
            </Grid>
            <Grid item xs={12}>
              {(testId !== null && section !== null) && <QuestionList testId={testId} section={section}/>}
            </Grid>
          </Grid>
          <CardActions>
            <Button
              startIcon={<SaveIcon/>}
              onClick={handleSave}
            >
              Guardar
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
}