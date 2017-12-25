module.exports = {
    config: {
        defaultPort: 3000
    },
    keys: process.env.NODE_ENV === 'production' ? require('./keys/productionKeys') : require('./keys/developmentKeys')
};