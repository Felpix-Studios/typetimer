const axios = require('axios');
const uri = "https://api.quotable.io/random?minLength=140";

module.exports = getData =()=>{
    return axios.get(uri).then(response=> response.data.content.split(" "));
}
