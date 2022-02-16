import React, { useState, useReducer, useEffect } from 'react'

export const useForm = (callback, validate) => {
  const formReducer = (state, event) => {
    return {  
      ...state,
      [event.name]: event.value,
    }
  }

  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useReducer(formReducer, {})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const isCheckbox = e.target.type === 'checkbox'

    setFormData({
      name: e.target.name,
      value: isCheckbox ? e.target.checked : e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setErrors(validate(formData))
    setSubmitting(true)

    setTimeout(() => {
      setSubmitting(false)
      setFormData({})
    }, 3000)

    console.log(formData)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      callback()
    }
  }, [errors])

  return { handleChange, handleSubmit, formData, errors }
}