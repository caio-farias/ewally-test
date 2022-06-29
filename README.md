[![codecov](https://codecov.io/gh/caio-farias/linhadigitavel2data-app/branch/master/graph/badge.svg?token=GJ6N0U1M9S)](https://codecov.io/gh/caio-farias/linhadigitavel2data-app)

# How to run the project

## Via docker-compose

- Make sure docker and docker-compose are installed in your machine.
- At your the project's directory, execute:

  ```
  docker-compose up --build -d
  ```

- The app will be available at: http://localhost:3000/api/v1

## Via npm/yarn

- Make sure npm or yarn are installed in your machine.
- At the project's root directory, execute:

  - Using npm:

    ```
      npm i
    ```

  - Using yarn:

    ```
      yarn
    ```

- Now, execute:

  - Using yarn:

    ```
      yarn dev
    ```

  - Using npm:

    ```
      npm run dev
    ```

- The app will be available at: http://localhost:3000/api/v1.

## Getting data from bank bills and concessionarie bills

- Endpoint (GET): http://localhost:3000/api/v1/bills/BILL_NUMBER
  - Example (GET): http://localhost:3000/api/v1/bills/00190500954014481606906809350314337370000000100
  - Expected response body:
    ```
    {
      "barcode": "00193373700000001000500940144816060680935031",
      "amount": 1,
      "expirationDate": "2007-12-31"
    }
    ```
