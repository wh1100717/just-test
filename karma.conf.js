// Generated by CoffeeScript 1.7.1
module.exports = function(config) {
  return config.set({
    basePath: '',
    frameworks: ['jasmine', 'requirejs'],
    files: [
      'test-main.coffee', {
        pattern: 'test/**/*Spec.js',
        included: false
      }
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome', 'Firefox', 'Safari', 'PhantomJS', 'Opera', 'IE'],
    singleRun: false
  });
};
