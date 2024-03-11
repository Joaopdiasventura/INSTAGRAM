import app from '../../app';

describe('Teste para o endpoint /follow', () => {
  it('Deve retornar um objeto sobre um follow', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/follow',
      body:{
        fk_user_email: "joaopdiasventura@gmail.com",
        fk_user_email_: "teste@gmail.com"
      }
    });

    expect(response.statusCode).toBe(201);
  }, 10000);
});