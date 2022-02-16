import React from 'react'

export const useFetch = (url, initialState = []) => {
    const [ data, setData ] = React.useState(initialState)
    const [ isFetching, setFetching ] = React.useState(true)
    const [ error, setError ] = React.useState(null)
  
    React.useEffect(() => {
      setFetching(true)
      fetch(url)
        .then(res => res.json())
        .then(
          data => {
          setData(data)
          setFetching(false)
          },
          error => {
            setFetching(true)
            setError(error)
          }
        )
    }, [ url ])
  
    return [
      data,
      isFetching,
      error
    ]
  
}