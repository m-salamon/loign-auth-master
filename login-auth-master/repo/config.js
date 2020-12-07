require('dotenv').config();
import knex from 'knex';
var knexConnection = knex({
    client: 'mysql',
    connection: {
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    debug: !true
})

knexConnection.raw('select 1+1 as result').catch(err => {
    console.log('ERROR CONNECTING: There was an error connecting to the database, make sure the DB is running and the connection keys are valid.')
});

export default knexConnection