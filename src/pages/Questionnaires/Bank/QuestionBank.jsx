import {InputLabel, Select, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import questionTypes from "../../../const/questionTypes";
import React, {useEffect, useState} from "react";
import FormControl from "@mui/material/FormControl";
import {useParams} from "react-router-dom";
import {findSection, getQuestionBank} from "../../../tools/testRequests";
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Table from '../../../components/commons/table';

const headers = {
  'type': 'Tipo',
  'title': 'Titulo',
  'createdAt': 'Fecha de creación'
};

export default function QuestionBank() {

  const [title, setTitle] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [section, setSection] = useState(null);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const {testId, sectionId} = useParams();

  useEffect(async () => {
    const mySection = await findSection(testId, sectionId);
    setSection(mySection);
  }, []);

  const handleSearch = async () => {
    const questionBank = await getQuestionBank(title, questionType);
    setData(questionBank.data);
    setPagination(questionBank.pagination)
    console.log(questionBank);
  };

  return (
    <Box sx={{width: '100%'}}>
      <h4>
        Banco de preguntas
      </h4>
      <Card elevation={2} sx={{marginTop: '2em'}}>
        <CardContent sx={{minHeight: '350px'}}>
          <Grid container spacing={2}>
            {
              section ? (
                <>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Buscar por coincidencia de nombre"
                      variant="outlined"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel>Tipo de pregunta</InputLabel>
                      <Select
                        value={questionType}
                        label="Age"
                        onChange={(e) => setQuestionType(e.target.value)}
                      >
                        {
                          questionTypes.map((data) => <MenuItem key={data.key}
                                                                value={data.key}>{data.label}</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant={"contained"}
                      startIcon={<SearchIcon/>}
                      size={"large"}
                      disabled={title.length < 4}
                      onClick={handleSearch}
                    >Buscar</Button>
                  </Grid>
                </>
              ) : <h4>Sección invalida</h4>
            }
            <Grid item xs={12}>
              <Table data={data} headers={headers}/>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
