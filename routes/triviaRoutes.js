const request = require('request');

const category = 'music';
request.get({
  url: 'https://api.api-ninjas.com/v1/trivia?category=' + category,
  headers: {
    'X-Api-Key': 'M2hnCjb7Pb2SI/N55z86dw==5MtxGeevngK9CEqf'
  }
}, function (error, response, body) {
  if (error) return console.error('Request failed:', error);
  else if (response.statusCode !== 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body);
});
