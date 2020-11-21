// Karma configuration
// Generated on Mon Aug 17 2020 15:25:07 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
  config.set({
    // trying to help chrome work.
    browserNoActivityTimeout: 400000,
    browserDisconnectTimeout: 10000,
    captureTimeout: 210000,
    browserDisconnectTolerance: 3,
    processKillTimeout: 100000,

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      { pattern: 'src/**/*.js',  type: 'module', included: true },
      { pattern: 'test/**/*.js', type: 'module' }
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'junit'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['ChromeExperiment', 'Firefox'],
    //browsers: ['ChromeHeadlessNoSandbox'],
    browsers: ['FirefoxHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,


    esm: {
      // if you are using 'bare module imports' you will need this option
      nodeResolve: true
    },

    customLaunchers: {
      ChromeExperiment: {
        base: 'Chrome',
        flags: [
          '--no-sandbox', //default karma-esm configuration
          '--disable-setuid-sandbox', //default karma-esm configuration
          '--enable-experimental-web-platform-features', // necessary when using importMap option
          '--disable-web-security', '--disable-site-isolation-trials' //trying these we saw mentioned.
        ]
      },
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox', //default karma-esm configuration
          '--disable-setuid-sandbox', //default karma-esm configuration
          '--enable-experimental-web-platform-features' // necessary when using importMap option
        ]
      },
    },

    junitReporter: {
      outputDir: 'results', // results will be saved as $outputDir/$browserName.xml
      outputFile: 'test_results.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: 'jasmine', // suite will become the package name attribute in xml testsuite element
      useBrowserName: false, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {}, // key value pair of properties to add to the <properties> section of the report
      xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
    }
  });
};
