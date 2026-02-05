# Idempotent Wallet

A `/transfer` endpoint using Node.js and Sequelize that handles race conditions to prevent double-spending and uses an "idempotency key" logic so that a double-tap from a client doesn't process the transaction twice.

## Prerequisites

Node.js version 16.x.x or higher

## Built With

- Express.js - Web Framework
- TypeScript - Programming language
- Sequelize - ORM
- PostgreSQL - Database

## Installation

1. Clone the repository and navigate to the project directory

```bash
git clone <repository-url>
cd idempotent_wallet
```

2. Install app dependencies

```bash
npm install
```

This will install all modules listed as dependencies in package.json

3. Create a `.env` file in the root directory and set the environment variables:

```bash
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_USERNAME_TEST=postgres
DB_PASSWORD_TEST=your_password
DB_USERNAME_PROD=postgres
DB_PASSWORD_PROD=your_password
IDEMPOTENT_WALLET_DEV_DB=idempotent_db
IDEMPOTENT_WALLET_TEST_DB=idempotent_db
IDEMPOTENT_WALLET_PROD_DB=idempotent_db
IDEMPOTENT_WALLET_DB_HOST_DEV=localhost
IDEMPOTENT_WALLET_DB_HOST_TEST=localhost
IDEMPOTENT_WALLET_DB_HOST_PROD=localhost
DB_DIALECT=postgres
HOST=localhost
PORT=8000
```

Replace the values with your desired configuration.

## Database Setup

1. Create the PostgreSQL database:

```bash
createdb idempotent_db
```

2. Run database migrations:

```bash
npm run db:migrate
```

To reset and re-run all migrations:

```bash
npm run db:fresh:dev
```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

### Test Environment

```bash
npm run start:test
```

## Server Startup

When you see the following output, the server is up and running:

```
Executing (default): SELECT 1+1 AS result
⚡️[database]: Database connection has been established successfully.
⚡️[server]: Server is running at http://localhost:8000
```

## API Endpoint

### Transfer

**POST** `/transfer`

Creates a wallet-to-wallet transfer with idempotency protection.

**Request Body:**

```json
{
    "fromWalletId": "wallet_id_1",
    "toWalletId": "wallet_id_2",
    "amount": 100,
    "idempotencyKey": "unique_key_123"
}
```

## Features

- **Race Condition Handling**: Uses Sequelize transactions to prevent double-spending
- **Idempotency**: Prevents duplicate transactions from client double-taps
- **Transaction Logging**: Creates a PENDING transaction log entry before processing
- **Balance Validation**: Ensures sufficient funds before transfer
- **Atomic Operations**: All wallet updates happen within a database transaction

## Author

Seun Awonugba

## License

ISC
