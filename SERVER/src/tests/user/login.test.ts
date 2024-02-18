import app from "../../app";

describe('Testes de integração para a rota /register', () => {
    it('Deve retornar um status de 400', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/login',
        body: {

        }
      });
  
      expect(response.statusCode).toBe(400);
    }, 10000);
  });