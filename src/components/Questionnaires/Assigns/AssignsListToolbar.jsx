import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import {
    Toolbar,
    OutlinedInput,
    InputAdornment
} from '@mui/material';

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
}));
  
const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
}),
'&.Mui-focused': { width: 320},
'& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
}
}));

const AssignsListToolbar = ({ filterTitle, onFilterTitle }) => {
    return ( 
        <RootStyle>

            <SearchStyle
                value={filterTitle}
                onChange={onFilterTitle}
                placeholder="Buscar titulo..."
                startAdornment={
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
                }
            />

        </RootStyle>
    );
}

AssignsListToolbar.propTypes = {
    filterTitle: PropTypes.string,
    onFilterTitle: PropTypes.func
};
 
export default AssignsListToolbar;