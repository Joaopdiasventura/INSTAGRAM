import app from '../../app';

describe('Testes de integração para a rota /find/:name', () => {
  it('Deve retornar uma array de users', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/find/oj'
    });

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);

    expect(body).toBeInstanceOf(Array);

    expect(body.length).toBeGreaterThan(0);
  }, 10000);
});

describe('Testes de integração para a rota /email/teste@gmai.com', () => {
  it('Deve retornar uma resposta de 200', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/user/teste@gmail.com'
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);

    expect(body).toBeInstanceOf(Object);
  }, 10000);
});                                                                                                 