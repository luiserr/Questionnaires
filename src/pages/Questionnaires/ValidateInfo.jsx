export default function validateInfo(formData) {
    let errors = {}
  
    if (!formData.titulo) {
      errors.titulo = 'El titulo es requerido'
    }
    /*if (!formData.lastName) {
      errors.lastName = 'EL apellido es requerido'
    }*/
    if (!formData.country) {
      errors.country = 'El tipo de asignación es requerido'
    }
    /*if (!formData.email) {
      errors.email = 'Email required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid'
    }
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more'
    }*/
  
    return errors
  }