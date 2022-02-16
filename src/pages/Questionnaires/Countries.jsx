import React, { useEffect, useState } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { InputLabel } from '@mui/material'

const Countries = (props) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [countries, setCountries] = useState([])

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true)
          setCountries(data.sort((a, b) => (a.name < b.name ? -1 : 1)))
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  const sortedCountries = countries.sort((a, b) =>
    a.name.common < b.name.common ? -1 : 1
  )

  if (error) {
    return <InputLabel>Error: {error.message}</InputLabel>
  } else if (!isLoaded) {
    return <InputLabel>Loading...</InputLabel>
  } else {
    return (
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        label='Country'
        name='country'
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
      >
        {sortedCountries.map((country) => (
          <MenuItem key={country.id} value={country.name.common}>
            {country.name.common}
          </MenuItem>
        ))}
      </Select>
    )
  }
}

export default Countries