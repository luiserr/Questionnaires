import React from 'react'
import {
    InputLabel,
    Select,
    MenuItem,
    CircularProgress
} from '@mui/material'
import { useFetch } from '../fetchHook';

const useSelectTypeAssign = (label, tipoAssign) => {

    const [state, setState] = React.useState('')
    //const [ data, isLoading, error ] = useFetch('http://sena.localhost:8000/api/assignQuestionnaires/' + tipoAssign, {});
    
    const SelectTypeAssign = () => (
        <>
            
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>      
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state}
                onChange={ e => setState( e.target.value )}
            >

                {
                    tipoAssign.map( opcion => (
                        <MenuItem 
                        key={opcion.id}
                        value={opcion.id}
                        >{opcion.title}</MenuItem>
                    ))
                }
            </Select>
        </>
    )

    return [ state, SelectTypeAssign ]
}

export default useSelectTypeAssign