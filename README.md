
# INSTAGRAM

Esse é um projeto onde eu utilizei React para o Front-end, Typescript como lingugem para o Back-end e o MongoDb como SGDB, também utilizei a AWS S3 para guardar as imagens enviadas pelos usuários.



## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente em um arquivo .env na pasta SERVER

`AWS_ACCESS_KEY_ID = Sua chave de acesso da aws`

`AWS_SECRET_ACCESS_KEY = Sua chave de acesso secreta` 

`AWS_DEFAULT_REGION = A região do seu bucket`

`AWS_BUCKET = O nome do seu bucket`

`EMAIL_USER = Seu email`

`EMAIL_PASSWORD = A senha do seu email` 

`DATABASE_URL= A url do seu banco de dados`

`FRONTEND = o link do seu frontend (caso vc tenha um)`

`SECRET_KEY = E a chave que será usada para criptografar os JsonWebTokens` 


## Inicialização 

```bash
  cd ./SERVER
  (npm run / yarn) install-deps
  (npm run / yarn) build-and-start
  cd ../

  cd ./CLIENT
  (npm i / yarn install)
  (npm run / yarn) vite
```
    
## Autor

- [@João Paulo Dias](https://github.com/Joaopdiasventura)

