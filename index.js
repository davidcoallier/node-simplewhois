var sys = require('sys');
var whois = require('./lib/whois');

var w = new whois.Whois({port:111});

w.query('echolibre.com', function(data) {
    sys.puts(data);
});