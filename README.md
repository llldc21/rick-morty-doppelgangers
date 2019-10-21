# Rick and Morty Doppelgangers

Uma API que oferece algumas informações sobre os personagens. A proposta é que a API retorne um ranking dos personagens que mais tem "doppelgangers", ou seja, personagens que têm mais versões diferentes dele em outros universos.

### Pré-requisitos

1 . Node.js [Instalar no Unix](https://github.com/nvm-sh/nvm#installation-and-update) / [Instalar no Windows](https://github.com/coreybutler/nvm-windows)

2 . NPM [Instalar no Unix](https://github.com/nvm-sh/nvm#installation-and-update) / [Instalar no Windows](https://github.com/coreybutler/nvm-windows)

3 . Docker [Instalar](https://docs.docker.com/install/)

### Iniciando

Foi montado um docker/docker-compose, para facilitar o funcionamento da api.

Nessa docker temos duas imagens, uma da api, outra do banco de dados (MongoDB) 

Para iniciar rode o seguinte comando no terminal:

```
npm run start-app
```

Logo a após a execução a api estará ouvindo em:

```
http://localhost:1234/api/doppelgangers
```

As imagens do docker utilizam as portas:

- 1234 - Para a api
- 27017 - Para o banco de dados

Portanto é necessario que essas portas estejam disponiveis no dispositivo que rodar o projeto.

### Teste

Para os testes é necessario que o docker continue ativo, feito isso podemos rodar o comando:

```
npm test
```
