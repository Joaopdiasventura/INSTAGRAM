import app from '../../app';

describe('Teste para o endpoint GET /post/:user', () => {
  it('Deve retornar uma array com os posts que o usuário segue', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/post/teste@gmail.com'
    });

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);

    expect(body).toBeInstanceOf(Array);
  }, 10000);
});