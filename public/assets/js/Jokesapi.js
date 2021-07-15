
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://geek-jokes.p.rapidapi.com/api?format=json",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "401018446bmsh98223740afd4f69p1ee68djsn7e81cb95e5fc",
		"x-rapidapi-host": "geek-jokes.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});
// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://jokeapi-v2.p.rapidapi.com/joke/Any?format=json&contains=C%2523&idRange=0-150&blacklistFlags=nsfw%2Cracist",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "401018446bmsh98223740afd4f69p1ee68djsn7e81cb95e5fc",
// 		"x-rapidapi-host": "jokeapi-v2.p.rapidapi.com"
// 	}
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });
