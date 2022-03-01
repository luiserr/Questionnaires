import Swal from 'sweetalert2';

/**
 *
 * @param message
 * @param success
 * @returns {Promise<void>}
 */
export const toast = async (message, success = true) => {
  const options = ({
    position: 'top-end',
    icon: success ? 'success' : 'error',
    title: message,
    showConfirmButton: false,
    timer: 8000,
    timerProgressBar: true,
    toast: true,
  });
  await Swal.fire(options);
};

export const myAlert = (title, icon = 'error') => {
  const options = {
    icon,
    title,
    timer: 6000,
    timerProgressBar: true,
  };
  Swal.fire(options);
};

export const loading = () => {
  Swal.fire({
    title: 'Cargando ...',
    allowEscapeKey: false,
    allowOutsideClick: false,
    showConfirmButton: false
  });
};
