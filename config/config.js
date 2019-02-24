const config = {
    development: {
        url: "mongodb+srv://admin:admin@cluster0-zcnfg.mongodb.net/inventories?retryWrites=true"
    }
}



module.exports = config[process.env.ENV] || config.development