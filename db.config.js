// const Pool = require('pg').Pool

// let pool;

// const host = "localhost";
// const user = "postgres";
// const database = "node_rest_shop";
// const password = "72428";
// const port = 5432;

// const defaultPool = new Pool({
//     host: host,
//     user: user,
//     database: "postgres",
//     password: password,
//     port: port,
// });

// // Connect to the PostgreSQL database
// defaultPool.connect()
//     .then(() => {
//         console.log(">.... Connected to Default PostgreSQL database ....<");
//         init_db()
//             .then(() => {
//                 console.log(">.... Database initialize complete! ....<");
//             })
//             .catch((err) => {
//                 console.error("Error initializing database: ", err);
//             });
//     })
//     .catch((err) => {
//         console.error("Error connecting to Default PostgreSQL: ", err);
//     });

// // Create the database if they don't exist
// async function init_db() {
//     console.log("Initializing init_db functiion...");
//     try {
//         const create_db_sql = "CREATE DATABASE " + database + ";";
//         const check_db_sql = "SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname = '" + database + "');";

//         const databaseExists = await defaultPool.query(check_db_sql);

//         console.log("Database (" + database + ") Exists: ", databaseExists.rows[0].exists);

//         if (!databaseExists.rows[0].exists) {
//             console.log("Creating (" + database + ") database...");

//             await defaultPool.query(create_db_sql)
//                 .then(() => {
//                     console.log(database + " Database created!");
//                 })
//                 .catch((err) => {
//                     console.error("Error creating database (" + database + "):", err);
//                     throw err;
//                 });
//         } else {
//             console.log("Database (" + database + ") already exists");
//         }
//         //
//         await change_pool();
//         //
//     } catch (err) {
//         throw err;
//     }
// };

// // defaultPool off and pool on for production
// async function change_pool() {

//     console.log("Connecting to (" + database + ") database...")

//     pool = new Pool({
//         host: host,
//         user: user,
//         database: database,
//         password: password,
//         port: port,
//     });

//     pool.connect()
//         .then(() => {
//             console.log("Connected to database (" + database + ")");
//             init_tables()
//                 .then(() => {
//                     console.log("Tables initialize complete!");

//                 })
//                 .catch((err) => {
//                     console.error("Error initializing tables: ", err);
//                 });
//         })
//         .catch((err) => {
//             console.error("Error connecting to " + database + " database: ", err);
//             throw err;
//         });

//     await end_default_pool();
// }

// // Create tables if they don't exist
// async function init_tables() {

//     let create_table_sql = "CREATE TABLE IF NOT EXISTS app_users (id SERIAL PRIMARY KEY, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL);";

//     create_table_sql += "CREATE TABLE IF NOT EXISTS app_products (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, price NUMERIC(10,2) NOT NULL, productImage VARCHAR(255) NOT NULL);";

//     create_table_sql += "CREATE TABLE IF NOT EXISTS app_orders (id SERIAL PRIMARY KEY, product INTEGER REFERENCES app_products(id), quantity INTEGER NOT NULL);";

//     pool.query(create_table_sql)
//         .then(() => {
//             console.log('Tables created or already exist');
//         })
//         .catch((err) => {
//             console.error('Error creating tables:', err);
//             throw err;
//         });
// }

// function end_default_pool() {
//     console.log("Closing Default PostgreSQL connection...");
//     defaultPool.end()
//         .then(() => {
//             console.log("Default PostgreSQL connection closed.");
//             return;
//         }).catch((err) => {
//             console.error('Error closing Default PostgreSQL connection:', err);
//             throw err;
//         });
// }