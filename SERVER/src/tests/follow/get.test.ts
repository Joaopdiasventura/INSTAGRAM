import app from '../../app';

describe('Teste para o endpoint /follower/:user', () => {
  it('Deve retornar uma array de pessoas que seguem o usuário', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/follower/teste@gmail.com'
    });

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);

    expect(body).toBeInstanceOf(Array);
  }, 10000);
});

describe('Testes para o endpoint /following/:user', () => {
  it('Deve retornar uma array de pessoas que o usuário está seguindo', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/following/teste@gmail.com'
    });

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);

    expect(body).toBeInstanceOf(Array);
  }, 10000);
});