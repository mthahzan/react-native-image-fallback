/**
 * @providesModule ImageLoader
 * @flow
 */
'use strict';

var NativeImageLoader = require('NativeModules').ImageLoader;

/**
 * High-level docs for the ImageLoader iOS API can be written here.
 */

var ImageLoader = {
  test: function() {
    NativeImageLoader.test();
  }
};

module.exports = ImageLoader;
