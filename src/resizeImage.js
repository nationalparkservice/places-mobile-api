var Bluebird = require('bluebird'),
  magickResize = require('magick-resize'),
  path = require('path');

module.exports = function(filePath, uuid, type) {
  return new Bluebird(function(fulfill, reject) {
    console.log('b1');
    // TODO: Better temp output filenames!
    var args = {
      'f': filePath,
      't': type,
      'o': uuid + '_' + type + path.extname(filePath)
    };
    // This try only catches sync errors, like missing modules, but anything helps
    try {
      magickResize(args, function(e, r) {
        args.error = e;
        args.result = r;
        if (e) {
          console.log('b2');
          reject(args);
        } else {
          console.log('b3');
          fulfill(args);
        }
      });
    } catch (err) {
      console.log('b4');
      args.error = err;
      reject(args);
    }
  });
};