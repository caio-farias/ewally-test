[![codecov](https://codecov.io/gh/caio-farias/linhadigitavel2data-app/branch/master/graph/badge.svg?token=GJ6N0U1M9S)](https://codecov.io/gh/caio-farias/linhadigitavel2data-app)

# Como executar o projeto

## Via docker-compose

- Ceritifique-se que existe o docker e docker-compose instalado na sua máquina
- No diretório raiz do projeto, execute:

  ```
  docker-compose up --build -d
  ```

- Aplicação acessível a partir de http://localhost:3000/api/v1

## Via npm/yarn

- Ceritifique-se que existe o npm ou yarn instalado na sua máquina
- No diretório do projeto raiz, execute:

  - Utilizando npm:

    ```
      npm i
    ```

  - Utilizando yarn:

    ```
      yarn
    ```

- Agora, execute:

  - Utilizando yarn:

    ```
      yarn dev
    ```

  - Utilizando npm:

    ```
      npm run dev
    ```

- Aplicação acessível a partir de http://localhost:3000/api/v1

## Consultando dados de boletos

- Endpoint (GET): http://localhost:3000/api/v1/bills/LINHA_DIGITAVEL
  - Exemplo (GET): http://localhost:3000/api/v1/bills/00190500954014481606906809350314337370000000100
  - Resposta:
    ```
    {
      "barcode": "00193373700000001000500940144816060680935031",
      "amount": 1,
      "expirationDate": "2007-12-31"
    }
    ```
