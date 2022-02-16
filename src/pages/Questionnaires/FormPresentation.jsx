import React from 'react'
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from '@mui/material'
import { presentationReducer } from '../../components/hooks/presentationReducer'

const FormPresentation = () => {
    
    const initialState = {
        typeCourse: true,
        modality: false,
        regional: false,
        centerTraining: false,
        program: false,
        rol: false
    };

    const { state, dispatch } = React.useReducer(presentationReducer, initialState);

    const handleChange = e => {
        const { value } = e.target;
        onSelected(value);
    }

    const onSelected = value => ({

    });

    return ( 
        <>
        <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Tipo de asignación</FormLabel>
                <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleChange}
                >
                <FormControlLabel value="typecourse" control={<Radio />} label="Tipo de curso" />
                <FormControlLabel value="modality" control={<Radio />} label="Modalidad" />
                <FormControlLabel value="regional" control={<Radio />} label="Regional" />
                <FormControlLabel value="centerTraining" control={<Radio />} label="Centro de formación" />
                <FormControlLabel value="program" control={<Radio />} label="Código de programa" />
                <FormControlLabel value="rol" control={<Radio />} label="Rol" />
                </RadioGroup>
            </FormControl>
        </>
     );
}
 
export default FormPresentation;