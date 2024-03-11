import app from '../../app';

describe('Teste para o endpoint /comment', () => {
  it('Deve retornar um objeto de comentário', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/comment',
      body:{
        content: "opa",
        email: "teste@gmail.com",
        post: "65cd46d3c2086b7b84503352"
      }
    });

    expect(response.statusCode).toBe(201);
  }, 10000);
});