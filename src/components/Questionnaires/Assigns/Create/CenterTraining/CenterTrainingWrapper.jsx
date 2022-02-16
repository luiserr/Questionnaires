import React from 'react'
import { Grid, Container } from '@mui/material'
import ListCenterTraining from './ListCenterTraining'

const CenterTrainingWrapper = () => (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <ListCenterTraining />
        </Grid>
      </Grid>
    </Container>
)

export default CenterTrainingWrapper