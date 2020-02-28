var http = require('http');
const fs = require('fs');

fs.readFile('./index.html', (err, html) => {
    if(err){
        throw err;
    }
});

var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    var html = fs.readFileSync('./index.html');
    res.write(html);    
    res.end();
});
server.listen(8080);