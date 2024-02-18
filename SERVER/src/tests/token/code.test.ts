import app from '../../app';

describe('Teste para o endpoint /token/code', () => {
  it('Deve retornar um código como uma string', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/code',
      body:{
        teste: "funcionou"
      }
    });

    expect(response.statusCode).toBe(201);

    const body = response.body;

    expect(typeof body).toEqual('string');
  }, 10000);
});
