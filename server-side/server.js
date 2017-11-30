const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const { User } = require('./users/models');
const { router: usersRouter } = require('./users');
mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL, CLIENT_ORIGIN } = require('./config');

const app = express();

app.use(morgan('common'));

app.use(cors({
    origin: CLIENT_ORIGIN
}));

app.get('*', (req, res, next) => {
    return res.status(200).json({ ok: true });
});

app.use('/users', usersRouter);

let server;

function runServer(databaseurl = DATABASE_URL) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseurl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(PORT, () => {
                console.log(`Your app is listening on port ${PORT}`);
                resolve();
            })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
};

module.exports = { app, runServer, closeServer };

