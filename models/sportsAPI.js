const http = require("https");

const options = {
	"method": "GET",
	"hostname": "thesportsdb.p.rapidapi.com",
	"port": null,
	"path": "/all_sports.php",
	"headers": {
		"x-rapidapi-key": "2c5a88b346msh66143a1dd3628fap1dc4fdjsnf96d5c580d31",
		"x-rapidapi-host": "thesportsdb.p.rapidapi.com",
		"useQueryString": true
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();