"use strict";

/**
 * @typedef {import ("allure-js-commons").TESTSTATUS} TESTSTATUS
 */

var Base = require("mocha").reporters.Base;

/**
 * @type {typeof import ("allure-js-commons/index")}
 */
var Allure = require("allure-js-commons");
var allureReporter = new Allure();

/**
 * @type {typeof import ("allure-js-commons/runtime")}
 */
var Runtime = require("allure-js-commons/runtime");

global.allure = new Runtime(allureReporter);

/**
 * Initialize a new `Allure` test reporter.
 *
 * @constructor
 * @param {Mocha.Runnable} runner
 * @param {any} opts mocha options; reporterOptions are used
 */
function AllureReporter(runner, opts) {
    Base.call(this, runner);
    allureReporter.setOptions(opts.reporterOptions || {});

	/**
	 * @param {Function} handler 
	 */
    function invokeHandler(handler) {
		/**
		 * @this {import("index")}
		 */
		var f = function() {
            try {
                return handler.apply(this, arguments);
            } catch(error) {
                console.error("Internal error in Allure:", error); // eslint-disable-line no-console
            }
		};
		return f;
    }

    runner.on("suite", invokeHandler(
		/**
		 * 
		 * @param {Mocha.Suite} suite 
		 */
		function (suite) {
        allureReporter.startSuite(suite.fullTitle());
    }));

    runner.on("suite end", invokeHandler(function () {
        allureReporter.endSuite();
    }));

    runner.on("test", invokeHandler(
		/**
		 * 
		 * @param {Mocha.Test} test 
		 */
		function(test) {
        if (typeof test.currentRetry !== "function" || !test.currentRetry()) {
          allureReporter.startCase(test.title);
        }
    }));

    runner.on("pending", invokeHandler(
		/** 
		 * @param {Mocha.Test} test 
		*/
		function(test) {
        var currentTest = allureReporter.getCurrentTest();
        if(currentTest && currentTest.name === test.title) {
            allureReporter.endCase("skipped");
        } else {
            allureReporter.pendingCase(test.title);
        }
    }));

    runner.on("pass", invokeHandler(
		/**
		 * 
		 */
		function() {
        allureReporter.endCase("passed");
    }));

    runner.on("fail", invokeHandler(
		/**
		 * 
		 * @param {Mocha.Test} test 
		 * @param {import("assert").AssertionError} err 
		 */
		function(test, err) {
        if(!allureReporter.getCurrentTest()) {
            allureReporter.startCase(test.title);
        }
		var isAssertionError = err.name === "AssertionError" || err.code === "ERR_ASSERTION";
		/**
		 * @type {TESTSTATUS}
		 */
        var status  =  isAssertionError ? "failed" : "broken";
        if(global.onError) {
            global.onError(err);
        }
        allureReporter.endCase(status, err);
    }));

    runner.on("hook end", invokeHandler(
		/**
		 * 
		 * @param {Mocha.Hook} hook 
		 */
		function(hook) {
        if(hook.title.indexOf('"after each" hook') === 0) {
            allureReporter.endCase("passed");
        }
    }));
}

module.exports = AllureReporter;
