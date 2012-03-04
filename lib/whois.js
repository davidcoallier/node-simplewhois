/**
 * This whois module is used to make whois requests to retrieve the whois
 * information relative to a hostname. The same can be accomplished using
 * the CLI directly and typing $> whois github.com for instance
 *
 * Here's a simple example of how to use the module to retrieve the whois information
 * for github.com.
 *
 * <code>
 * var sys = require('sys');
 * var whois = require('./lib/whois');
 *
 * var who = new whois.Whois();
 * who.query('github.com', function(response) {
 *     sys.puts(sys.inspect(response));
 * }
 *
 * </code>
 *
 * In the event where you would like to use a different port and hostname
 * than 43 and whois.internic.net, you could do:
 *
 * <code>
 * var sys = require('sys');
 * var whois = require('./lib/whois');
 *
 * var who = new whois.Whois({
 *     port:666, 
 *     hostname:'whois.arpanet.net'
 * });
 *
 * who.query('github.com', function(response) {
 *     sys.puts(sys.inspect(response));
 * }
 *
 * </code>
 *
 * Author: David Coallier <david.coallier@gmail.com>
 * License: New BSD <http://www.opensource.org/licenses/bsd-license.php>  
 * Date: 10th November, 2010
 */
var net = require('net');

/**
 * Since I miss my good ol' jquery.extend() I've decided to do 
 * my own that I'd bundle with my simple-whois plugin. 
 *
 * If you require more information as to why I do not simply override the
 * Object.prototype.extend directly, please read the blog post I've written
 *  specifically for this: http://bit.ly/a7I7l3
 */
Object.defineProperty(Object.prototype, "extend", {
    enumerable: false,
    value: function(from) {
        var props = Object.getOwnPropertyNames(from);
        var dest = this;
        props.forEach(function(name) {
            if (name in dest) {
                var destination = Object.getOwnPropertyDescriptor(from, name);
                Object.defineProperty(dest, name, destination);
            }
        });
        return this;
    }
});

/**
 * Our Whois "constructor"
 *
 * This is where we instantiate the initial Whois object
 * setting whichever options we need using an object.
 *
 * @param  Object opts  An object (key-value) of values.
 * @return this
 */
var Whois = function(opts) {
    var options = {
        authoritative: false,
        port:  43,
        hostname: 'whois.internic.net',
        timeout: false
    };
    
    this.options = options.extend(opts || {});
    return this;
};

/**
 * Private _query function
 *
 * This method could completely replace the Whois.prototype.query
 * method however we keep it for future purposes in case we need
 * to create a Whois.queryIPv6 or anything that could make use of
 * the _query method.
 *
 * It should be general enough so that it's used to make any of
 * the requests we need in the future.
 *
 * @param  string domain     The domain to retrieve the whois information
 * @param  callback callback The callback function to invoke once we receive some whois
 *                           information from the whois servers.
 * @return this
 */
Whois.prototype._query = function(domain, callback) {
    var stream = net.createConnection(this.options.port, this.options.hostname);
    stream.addListener('connect', function() {
        stream.write(domain + '\r\n');
    });
    
    stream.addListener('data', function(data) {
        callback(null, data);
    });
    
    stream.addListener('error', function(err) {
        callback(err, null);
    });
    
    stream.addListener('error', function(data) {
        callback(data);
    });
    
    stream.addListener('end', function() {
        stream.end();
    });

    return this;
};

/**
 * Public API query method
 *
 * This is the public method used by the developers to
 * place requests onto the whois server using a domain
 * name and a callback function.
 *
 * @param  string domain     The domain to retrieve the whois information
 * @param  callback callback The callback function to invoke once we receive some whois
 *                           information from the whois servers.
 * @return this
 */
Whois.prototype.query = function(domain, callback) {
    return this._query(domain, callback);
};

// And we export to Node.js!
exports.Whois = Whois;
