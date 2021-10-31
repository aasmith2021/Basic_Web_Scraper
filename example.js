var http = require('http');
var urls = [
    'http://cincinnatizoo.org/animals/aardvark-2/',
    'http://cincinnatizoo.org/animals/aardwolf/',
];
var completed_requests = 0;
let data = '';

urls.forEach(function(url) {
  var responses = [];
  http.get(url, function(res) {
    res.on('data', function(chunk){
        data += chunk;
        responses.push(data.split('<h2>')[1].split(' <i')[0]);
    });

    res.on('end', function(){
      if (completed_requests++ == urls.length - 1) {
        // All downloads are completed
        console.log(responses.join());
      }      
    });
  });
})