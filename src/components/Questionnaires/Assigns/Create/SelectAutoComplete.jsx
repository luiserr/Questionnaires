import React from 'react';
import { 
    Checkbox, 
    TextField,
    Autocomplete
} from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SelectAutoComplete = (props) => {

    console.log('Componente creado');

    const { data } = props;

    return (  

        <Autocomplete
        multiple
        size="small"
        options={data}
        disableCloseOnSelect
        getOptionLabel={option => option.title}
        renderOption={(props, option, { selected }) => (
            <li {...props}>
                <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
                />
                {option.title}
            </li>
        )}
        style={{ width: "100%" }}
        renderInput={params => (
            <TextField
            {...params}
            variant="outlined"
            label="Titulada"
            placeholder="Seleccione una opción"
            />
        )}
        />

    );
}

export default SelectAutoComplete;