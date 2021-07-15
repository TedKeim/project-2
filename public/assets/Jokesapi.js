var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://geek-jokes.p.rapidapi.com/api',
  params: {format: 'json'},
  headers: {
    'x-rapidapi-key': '401018446bmsh98223740afd4f69p1ee68djsn7e81cb95e5fc',
    'x-rapidapi-host': 'geek-jokes.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});