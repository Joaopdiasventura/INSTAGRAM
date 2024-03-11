import app from "../../app";

describe('Testes de integração para a rota /register', () => {
    it('Deve retornar um status de 400', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/updateBio',
        body: {

        }
      });
  
      expect(response.statusCode).toBe(400);
    }, 10000);
});

describe('Testes de integração para a rota /register', () => {
    it('Deve retornar um status de 400', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/updateImage',
        body: {

        }
      });
  
      expect(response.statusCode).toBe(400);
    }, 10000);
});