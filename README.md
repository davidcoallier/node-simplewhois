node.js simple Whois module
============================

> Retrieve whois information of hostnames.

introduction
------------
This node.js module is used to retrieve whois information for a hostname.

synopsis
--------

Creating a basic Whois object:

    var sys   = require('sys');
    var whois = require('./lib/whois');

    var who = new whois.Whois();
    
Now that you have the Whois object instantiated, you can make a *whois* request on a hostname like such:
  
    who.query('github.com', function(response) {
        sys.puts(sys.inspect(response));
    }

In the event where one would need or want to use a different whois server on a different port, this information
can be changed using the constructor as such:

    var who = new whois.Whois({port:666, hostname:'whois.arpanet.net'});

It currently does not support failing requests and will hang whenever the whois's socket doesn't end a request.
 
license
-------

Released under the New BSD License.

Copyright (c) 2010 David Coallier


disclaimer
----------

Very likely to be broken. Feel free to contribute, there's still a bunch to do like query of ipv6 and whatnot.

