import getAddressFromCep from './getAddressFromCep.js';

import fetch from 'node-fetch'; 
var global.fetch = fetch;

describe('Test the functions of the app', () => {
  it('Should return the data when given a valid postal code', async () => {
    const address = await getAddressFromCep('30130010');
    expect(address.cep).toBe('30130-010');
    expect(address.logradouro).toBe('Praça Sete de Setembro');
    expect(address.bairro).toBe('Centro');
    expect(address.uf).toBe('MG');
  });
  
  it('should acept a postal code with and without "-"', async () => {
    let address = await getAddressFromCep('30130010');
    expect(address.cep).toBe('30130-010');
    address = await getAddressFromCep('30130-010');
    expect(address.cep).toBe('30130-010');
  });
  
  it('Should throw an error when given a empty input', async () => {
    const emptyCep = '';
    await expect(getAddressFromCep(emptyCep)).rejects.toThrow(
      new Error('You need to input a valid postal code!')
    );
  });
  
  it('Should throw an error when given an invalid cep', async () => {
    const invalidCep = 'XXXXX-XXX';
    const invalidCepLessDigits = '00000-00';
    const invalidCepMoreDigits = '00000-0000';
    await expect(getAddressFromCep(invalidCep)).rejects.toThrow();
    await expect(getAddressFromCep(invalidCepLessDigits)).rejects.toThrow();
    await expect(getAddressFromCep(invalidCepMoreDigits)).rejects.toThrow();
  });
})
