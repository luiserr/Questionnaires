import React from 'react';
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Typography, Button, Grid } from '@mui/material'

const PageTitle = ({
    heading = '',
    subHeading = '',
    to = '',
    ...rest
}) => {
    return (
        <Grid container justifyContent="space-between" alignItems="center" {...rest}>
            <Grid item>
                <Typography variant="h4" component="h4" gutterBottom>
                    {heading}
                </Typography>
            </Grid>
            <Grid item>
                <Button
                    component={RouterLink}
                    to={to}
                    sx={{ mt: { xs: 2, md: 0 } }}
                    variant="contained"
                    startIcon={<ArrowBackIcon fontSize="small" />}
                >
                    Regresar
                </Button>
            </Grid>
        </Grid>
    );
};

PageTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    to: PropTypes.string,
};

export default PageTitle;