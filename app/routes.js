const proxyController = require('./controllers/proxyController');

exports.init = app => {

    app.use('/healthCheck', (_, res) => res.status(200).send({ uptime: process.uptime() }));

    app.get(`/:param`, proxyController.proxyWithParam);

    app.get(`/`, proxyController.proxyWithoutParams);

}