var config = {
    development: {
        // development mongodb
        url: 'mongodb://admin:admin@ds145659.mlab.com:45659/todos',
        
    },
    production: {
        // production mongodb
        url: 'mongodb://admin:admin@ds147069.mlab.com:47069/heroku_8p81d1zw',
        
    }
};
module.exports = config;