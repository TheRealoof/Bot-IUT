import axios from "axios";

function ApiRequest(url, callback, params)
{
    axios.get(process.env.REACT_APP_API + url, {
        headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
        },
        params: params
    })
    .then(callback)
    .catch( (err) => {console.log(err);} );
}

export default ApiRequest;