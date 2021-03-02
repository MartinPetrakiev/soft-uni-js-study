module.exports = {
    development: {
        port: process.env.PORT || 3000,
        SALT_ROUNDS: 1,
        SECRET: 'pachanga',
        COOKIE_NAME: 'USER_SESSION'
    },
    production: {
        port: 80,
        SALT_ROUNDS: 10,
        SECRET: 'pachanga',
        COOKIE_NAME: 'USER_SESSION'
    }
};