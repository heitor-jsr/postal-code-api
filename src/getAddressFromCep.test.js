import getAddressFromCep from './getAddressFromCep.js';

import fetch from 'node-fetch'; 
var global.fetch = fetch;

describe('Test the functions of the app', () => {
  it('deve retornar os dados quando passamos um cep válido', async () => {
    const address = await getAddressFromCep('30130010');
    expect(address.cep).toBe('30130-010');
    expect(address.logradouro).toBe('Praça Sete de Setembro');
    expect(address.bairro).toBe('Centro');
    expect(address.uf).toBe('MG');
  });
  
  it('deve aceitar ceps com hífen ou sem hífen', async () => {
    let address = await getAddressFromCep('30130010');
    expect(address.cep).toBe('30130-010');
    address = await getAddressFromCep('30130-010');
    expect(address.cep).toBe('30130-010');
  });
  
  it('Deve lançar erro "Você precisa passar um CEP" quando passar cep vazio', async () => {
    const emptyCep = '';
    await expect(getAddressFromCep(emptyCep)).rejects.toThrow(
      new Error('Você precisa passar um CEP')
    );
  });
  
  it('Deve lançar erro quando passar cep inválido', async () => {
    const invalidCep = 'XXXXX-XXX';
    const invalidCepLessDigits = '00000-00';
    const invalidCepMoreDigits = '00000-0000';
    await expect(getAddressFromCep(invalidCep)).rejects.toThrow();
    await expect(getAddressFromCep(invalidCepLessDigits)).rejects.toThrow();
    await expect(getAddressFromCep(invalidCepMoreDigits)).rejects.toThrow();
  });
})
