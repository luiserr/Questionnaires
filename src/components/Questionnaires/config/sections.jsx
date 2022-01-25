import React, {useState} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AccordionDetails from "@mui/material/AccordionDetails";


export default function Sections({test}) {
  const [showQuestion, setShowQuestion] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Grid item sx={12}>
        <Button
          sx={{marginTop: '2em', marginBottom: '2em'}}
          variant="contained"
          onClick={() => setShowQuestion(!showQuestion)}
        >
          Crear sección
        </Button>
        <Grid item sx={12}>

        </Grid>
      </Grid>
    </>
  );
}

