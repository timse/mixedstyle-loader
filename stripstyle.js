/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tim Sebastian @timse
*/
var loaderUtils = require("loader-utils");

module.exports = function(content) {return content};
module.exports.pitch = function(remainingRequest){
    if(this.cacheable) this.cacheable();
    if (/style-loader/.test(remainingRequest)) {
        remainingRequest = remainingRequest.replace(/[^!]*style-loader[^!]*!?/, '');
        return 'module.exports = require("!!' + remainingRequest + '");';
    }
};
