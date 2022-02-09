import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

export default function SearchNotFound({ searchQuery = '' }) {
  return (
    <>
      <Typography gutterBottom align="center" variant="subtitle1">
        No encontrado
      </Typography>
      <Typography variant="body2" align="center">
        No se encontró resultados para &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Intente verificar errores ortográficos o usar palabras completas.
      </Typography>
    </>
  );
}

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};