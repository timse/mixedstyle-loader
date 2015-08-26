/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tim Sebastian @timse
*/
var loaderUtils = require("loader-utils");
var parseImport = require("parse-import");

var importToRequire = function(path) {
    return '" + require("mixedstyle/stripstyle!' + path + '") + "';
};

var prepareExport = function(requires) {
    return 'module.exports = "' + requires + '";';
}

module.exports = function(content) {
    if(this.cacheable) this.cacheable();
    var contentStr = content.toString('utf8');
    var cssImports = parseImport(contentStr);
    if (!cssImports.length) {
        return content;
    }
    var res = cssImports.map(function(imp){
        return {
            find: imp.rule + ';',
            replace: importToRequire(imp.path)
        };
    }).reduce(function(content, item){
        return content.replace(item.find, item.replace);
    }, contentStr).replace(/\n/g,'');

    return prepareExport(res);
}
module.exports.raw = true;
