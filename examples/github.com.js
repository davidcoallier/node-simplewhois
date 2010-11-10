var sys = require('sys');
var whois = require('../lib/whois');

var who = new whois.Whois();
who.query('github.com', function(response) {
    sys.puts(response);
});
