var sys = require('sys');
var whois = require('./lib/whois');

var w = new whois.Whois();

w.query('echolibre.com', function(data) {
    sys.puts(data);
});
