CREATE DATABASE node_rest_shop;

\c node_rest_shop

CREATE TABLE app_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE app_products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    productImage VARCHAR(255) NOT NULL
);

CREATE TABLE app_orders (
    id SERIAL PRIMARY KEY,
    product INTEGER REFERENCES app_products(id),
    quantity INTEGER NOT NULL
);

\dt
