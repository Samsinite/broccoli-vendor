var fs = require('fs');
var path = require('path');

var UnwatchedTree = function(dir, jsFiles) {
  this.dir = dir;
  this.mainFiles = jsFiles;
}

UnwatchedTree.prototype.read = function (readTree) { return this.dir }
UnwatchedTree.prototype.cleanup = function () { }

var treeFromDirectory = function(dir) {
  var entries = fs.readdirSync(dir).sort()
  var jsFiles = entries.filter(function(f) {
    var f_split = f.split(".");

    return f_split[f_split.length - 1] === 'js';
  });

  return new UnwatchedTree(dir, jsFiles);
};

module.exports = function(vendor_dir) {
  var entries = fs.readdirSync(vendor_dir).sort();
  
  var directories = entries.filter(function(f) {
    return fs.statSync(path.join(vendor_dir, f)).isDirectory()
  });

  var jsFiles = entries.filter(function(f) {
    var f_split = f.split(".");

    return f_split[f_split.length - 1] === 'js';
  });

  var trees = (directories.map(function(dir) {
    return treeFromDirectory(path.join(vendor_dir, dir))
  }));

  if (jsFiles.length > 0) {
    trees.push(new UnwatchedTree(vendor_dir, jsFiles));
  }
  
  return trees;
};