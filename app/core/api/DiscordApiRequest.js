const Axios = require('axios');

module.exports = async (url, authorization) =>
{
    const res = await Axios.get(url, {
        headers: {
            Authorization: authorization
        }
    })
    .then( (response) => {
        return response;
    })
    .catch( (error) => {
        return error.response;
    });

    return res;
}