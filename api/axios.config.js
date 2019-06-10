const axios = require('axios');
import config from './../config'
export default axios.create({
    baseURL:  config.url,
});

