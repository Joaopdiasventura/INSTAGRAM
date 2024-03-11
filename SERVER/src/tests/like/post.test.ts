import app from '../../app';

describe('Teste para o endpoint /like', () => {
  it('Deve retornar um objeto de curtida', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/like',
      body:{
        post: "65cd46d3c2086b7b84503352",
        email: "teste@gmail.com"
      }
    });
    
    expect(response.statusCode).toBe(201);
  }, 10000);
});