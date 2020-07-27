const { parseQuery } = require('../helpers/endpoint.helper');
const { getResponseFromService } = require('../services/serviceProxy');

const proxyWithParam = (req, res, next) => {
    const { param } = req.params;
    const query = parseQuery(req.query);
    return getResponseFromService({ param, query })
        .then(response => res.send(response))
        .catch(error => next(error));
}

const proxyWithoutParams = (req, res, next) => {
    const query = parseQuery(req.query);
    return getResponseFromService({ query })
        .then(response => res.send(response))
        .catch(error => next(error));
}

module.exports = { proxyWithParam, proxyWithoutParams }