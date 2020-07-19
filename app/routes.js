const { response } = require("express")

exports.init = app => {

    app.use('/healthCheck', (_, res) => res.status(200).send({ uptime: process.uptime() }));

}