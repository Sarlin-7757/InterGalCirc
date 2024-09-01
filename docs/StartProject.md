# Intergalactic Trade Network Backend System Documentation

This documentation provides an overview of how to set up and start the Intergalactic Trade Network Backend System. Follow the steps below to get the project up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 14.x or higher
- **npm**: Version 6.x or higher
- **TypeScript**: Version 4.x or higher

You will also need a **MongoDB** account to store and manage the database for this project.

## Project Setup

### 1. Clone the Repository

Start by cloning the project repository from GitHub to your local machine:

```
git clone https://github.com/Sarlin-7757/InterGalCirc
cd InterGalCirc
```
## 2. Install Dependencies

Once inside the project directory, install the necessary Node.js packages:

```
npm install
```

## 3. Set Up TypeScript

Ensure TypeScript is installed globally on your system:

```
npm install -g typescript
tsc -v // to check installation
```


## 4. Create a MongoDB Account and Get Your URI

1. Sign up for a MongoDB account.
2. Create a new cluster or database.
3. Obtain your MongoDB connection URI (you will need this for the next step).

## 5. Set Up Environment Variables

1. Create a `.env` file in the root of your project directory. This file will store your MongoDB connection string.

    ```
    touch .env
    ```

2. Add your MongoDB URI to the `.env` file:

    ```
    export MONGODB_URL="your-mongodb-uri"
    ```

## 6. Run the Project

To start the project in development mode, use the following command:

```
npm run dev
```