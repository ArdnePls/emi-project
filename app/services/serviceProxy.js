const axios = require('axios');

const { SERVICE_URL } = require('../config/environment');
const errors = require('../middlewares/errorsHandler');

const getResponseFromService = (options) => {
    const { param, query } = options;
    const endpoint = param ? `/${param}${query}` : `${query}`;
    return axios.get(`${SERVICE_URL}${endpoint}`)
        .then(response => response.data)
        .catch(errors.defaultError);
}

module.exports = { getResponseFromService }