import app from '../../app';

describe('Teste para o endpoint DELETE /post/:post', () => {
  it('Deve retornar um status de 400', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/post/'
    });

    expect(response.statusCode).toBe(400);
  }, 10000);
});