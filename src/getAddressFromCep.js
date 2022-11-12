export default async function getAddressFromCep(cep) {
  if (!cep) throw new Error('You need to input a valid postal code!');

  const result = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await result.json();
  return data;
}