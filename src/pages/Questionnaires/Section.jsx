import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import JoditEditor from "jodit-react";
import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QuestionList from "../../components/Questionnaires/config/QuestionList";
import CardActions from "@mui/material/CardActions";
import SaveIcon from '@mui/icons-material/Save';
import {findSection, saveSection} from "../../tools/testRequests";
import Box from "@mui/material/Box";
import {useTest} from "../../components/hooks/testHook";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import {toast} from "../../utils/alerts";
import userContext from "../../context/userContext";

export default function Section() {

  const location = useLocation();
  const {testId, sectionId} = useParams();

  const currentTest = location?.state?.test;
  let currentSection = location?.state?.section || null;
  const user = useContext(userContext);
  const {test, disabled} = useTest(testId, currentTest, user);

  const navigate = useNavigate();


  const [section, setSection] = useState({
    id: null,
    title: '',
    numberQuestions: 0,
    ...currentSection
  });

  const [description, setDescription] = useState(currentSection?.description || '');

  useEffect(async () => {
    if (test && sectionId !== '_' && !currentSection) {
      const mySection = await findSection(test.id, sectionId);
      setSection(mySection);
      setDescription(mySection.description);
    } else {
      if (currentSection) {
        setSection(currentSection);
      }
    }
  }, [test, sectionId]);


  const handleBack = () => {
    navigate(`/admin/surveys/test/${testId}`, {state: {step: 2}});
  };

  const handleSave = async () => {
    if(section.title === '') {
      toast('Título requerido', false);
      return false;
    }
    if(description === '' || description === '<p></p>') {
      toast('Descripción requerida', false);
      return false;
    }
    const newSection = await saveSection(testId, section.id, section.title, description, 0);
    if (newSection) {
      navigate(`/admin/surveys/test/${testId}/section/${newSection.id}`, {state: {section: newSection}});
    }
  };

  const setData = (key, value) => {
    const data = {
      ...section,
      [key]: value
    };
    setSection(data);
  };

  const config = {
    readonly: disabled,
    uploader: {
      insertImageAsBase64URI: true
    }
  }

  return (
    <Box sx={{width: '100%'}}>
      <Breadcrumbs className="myBreadcrumb" sx={{marginBottom: '15px'}}>
        <Link alt={test?.title} title={test?.title}>
          {test?.title?.length > 30 ? `${test?.title?.substring(0, 30)} ...` : test?.title}
        </Link>
        <Link alt={section?.title} title={section?.title}>
          {section?.title?.length > 30 ? `${section?.title?.substring(0, 30)} ...` : section?.title}
        </Link>
      </Breadcrumbs>
      <h4>
        Configuración de sección
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
          <Grid container>
            <Grid item xs={10}>
              <Box component="form" sx={{'& .MuiTextField-root': {m: 1}}}>
                <TextField
                  inputProps={{
                    maxLength: 150
                  }}
                  fullWidth
                  id="title"
                  disabled={disabled}
                  label="Título*"
                  value={section.title}
                  onChange={(e) => setData('title', e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </Box>

            </Grid>
            {/*<Grid item xs={6}>*/}
            {/*  <Box component="form" sx={{'& .MuiTextField-root': {m: 1}}}>*/}
            {/*    <TextField*/}
            {/*      fullWidth*/}
            {/*      id="title"*/}
            {/*      label="Número de preguntas"*/}
            {/*      disabled={disabled}*/}
            {/*      value={section.numberQuestions}*/}
            {/*      onChange={(e) => setData('numberQuestions', e.target.value)}*/}
            {/*      variant="outlined"*/}
            {/*      size="small"*/}
            {/*      type="number"*/}
            {/*    />*/}
            {/*  </Box>*/}
            {/*</Grid>*/}
            <Grid item xs={10} sx={{marginTop: '1em'}}>
              <label>Descripción *</label>
              <JoditEditor
                config={config}
                value={description}
                onBlur={(text) => setDescription(text)}
              />
            </Grid>
            <Grid item xs={12}>
              {(test !== null && section.id !== null) && <QuestionList test={test} section={section}/>}
            </Grid>
          </Grid>
          <CardActions>
            <Button
              disabled={disabled}
              variant="contained"
              startIcon={<SaveIcon/>}
              onClick={handleSave}
            >
              Guardar sección
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
}