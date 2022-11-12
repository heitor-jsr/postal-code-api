import './style.css';
import Swal from 'sweetalert2';
import getAddressFromCep from './getAddressFromCep';
document.querySelector('button').addEventListener('click', handleClick);

export async function handleClick() {
  const cep = document.querySelector('input').value;

  try {
    const addressData = await getAddressFromCep(cep);
    document.querySelector('pre').innerHTML = JSON.stringify(addressData);
  } catch (error) {
    return Swal.fire({
      title: 'Opss...',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Cool',
    })
  }
}

