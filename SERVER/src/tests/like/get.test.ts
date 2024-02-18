import app from '../../app';

describe('Teste para o endpoint GET /like/:post', () => {
  it('Deve retornar uma array de likes em um post', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/like/65cd46d3c2086b7b84503352'
    });

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);

    expect(body).toBeInstanceOf(Array);
  }, 10000);
});