import app from '../../app';

describe('Teste para o endpoint DELETE /comment/:post', () => {
  it('Deve retornar um status de 400', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/comment/65cd46d3c2086b7b84503351'
    });

    expect(response.statusCode).toBe(400);
  }, 10000);
});