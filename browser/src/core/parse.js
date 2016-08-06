

dop.parse = function parse(data) {

    var that = this;

    return JSON.parse(data, function(k, v) {

        if ( typeof v == 'string' ) {

            if ( v == that.options.stringify_undefined )
                return undefined;

            else if ( parse.parse_type_date.exec(v) )
                return new Date(v);

            else if ( v.substr(0, that.options.stringify_regexp.length) == that.options.stringify_regexp ) {
                var split = /\/(.+)\/([gimuy]{0,5})/.exec(v.substr(that.options.stringify_regexp.length)); // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp
                return new RegExp(split[1], split[2]);
            }

        }

        return v;

    });

};
dop.parse.parse_type_date = /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/; //http://jsperf.com/serializing-date-on-json-parse