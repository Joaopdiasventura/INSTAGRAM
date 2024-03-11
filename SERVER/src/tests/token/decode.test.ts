import app from "../../app";

describe('Teste para o endpoint /token/decode', () => {
    it('Deve retornar um status de 400', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/decode',
        body: {
        }
      });
  
      expect(response.statusCode).toBe(400);
    }, 10000);
  });