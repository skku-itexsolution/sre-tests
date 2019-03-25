// Copyright 2014 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Testcases for ChromeVox's speech rules.
 *     Abstract superclass that provides facilities to parameterize the speech
 *     rule engine and to execute rule tests on math expressions.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AbstractRuleTest');

goog.require('sre.AbstractExamples');
goog.require('sre.DynamicCstr');



/**
 * @constructor
 * @extends {sre.AbstractExamples}
 */
sre.AbstractRuleTest = function() {
  sre.AbstractRuleTest.base(this, 'constructor');

  /**
   * @type {string}
   */
  this.style = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.STYLE];

  /**
   * @type {string}
   */
  this.domain = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.DOMAIN];

  /**
   * @type {string}
   */
  this.locale = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE];

  /**
   * @type {boolean}
   */
  this.semantics = false;

  /**
   * Specify particular rule sets for a test. By default all available rule sets
   * are used.
   * @type {Array.<string>}
   */
  this.rules = null;

  /**
   * Flag indicating if the actual output should be written to the HTML example
   * file, rather than the expected output.
   * @type {boolean}
   */
  this.actual = false;

};
goog.inherits(sre.AbstractRuleTest, sre.AbstractExamples);


/**
 * @override
 */
sre.AbstractRuleTest.prototype.setActive = function(file, opt_ext) {
  this.fileDirectory = this.fileDirectory + '/' + this.locale;
  sre.AbstractRuleTest.base(this, 'setActive', file, opt_ext);
};


/**
 * Tests if for speech translation of a given html snippet is equal to the
 * answer provided.
 * @param {string} mml Snippet of a MathML expression.
 * @param {string} answer Expected speech translation of MathML expression.
 * @param {string=} opt_style Mathspeak style for translation.
 */
sre.AbstractRuleTest.prototype.executeRuleTest = function(mml, answer,
                                                          opt_style) {
  var style = opt_style || this.style;
  var mathMl = '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
          mml + '</math>';
  sre.SpeechRuleEngine.getInstance().clearCache();
  sre.System.getInstance().setupEngine(
      {semantics: this.semantics, domain: this.domain, style: style,
        rules: this.rules, locale: this.locale});
  var result = sre.System.getInstance().toSpeech(mathMl);
  this.compareResult(mathMl, result, answer, style);
};


/**
 * Performs the actual assertion test. Appends the example to the output.
 * @param {string} mml A MathML expression.
 * @param {string} actual The actual test result.
 * @param {string} expected The expected test result.
 * @param {string=} opt_style Style used for translation.
 */
sre.AbstractRuleTest.prototype.compareResult = function(
  mml, actual, expected, opt_style) {
  this.appendExample_(mml, this.actual ? actual : expected,
                      opt_style || this.style);
  if (!this.actual) {
    this.assert.equal(actual, expected);
  }
};


/**
 * Appends a single example to the HTML example output.
 * @param {string} input The input expression.
 * @param {string} output The expected output.
 * @param {string} style The speech style.
 * @private
 */
sre.AbstractRuleTest.prototype.appendExample_ = function(input, output, style) {
  var key = '<h2>' + this.information + ' Locale: ' + this.locale +
      ', Style: ' +
      sre.AbstractRuleTest.htmlCell_(sre.AbstractRuleTest.styleMap_(style)) +
      '.</h2>';
  this.appendExamples(key,
                      sre.AbstractRuleTest.htmlCell_(input) +
                      sre.AbstractRuleTest.htmlCell_(output));
};


/**
 * Maps a style name to its English equivalent and does some pretty printing.
 * @param {string} style The style name.
 * @return {string} The prettier name.
 * @private
 */
sre.AbstractRuleTest.styleMap_ = function(style) {
  var map = {'default': 'verbose',
    'sbrief': 'superbrief'};
  var newStyle = map[style] || style;
  return newStyle.charAt(0).toUpperCase() + newStyle.slice(1);
};


/**
 * Wraps an entry into an HTML cell.
 * @param {number|string} entry A single entry.
 * @return {string} The HTML cell.
 * @private
 */
sre.AbstractRuleTest.htmlCell_ = function(entry) {
  return '<td>' + entry + '</td>';
};


/**
 * @override
 */
sre.AbstractRuleTest.prototype.cleanup = function(example) {
  return example;
};


/**
 * @override
 */
sre.AbstractRuleTest.prototype.join = function(examples) {
  for (var i = 0, l = examples.length; i < l; i++) {
    examples[i] = '<tr>' +
        sre.AbstractRuleTest.htmlCell_(i) + examples[i] +
        '</tr>';
  }
  return '\n<table>\n' + examples.join('\n') + '\n</table>\n';
};


/**
 * @override
 */
sre.AbstractRuleTest.prototype.header = function() {
  var mathjax = '<script type="text/javascript" async ' +
      'src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/' +
      'MathJax.js?config=TeX-AMS-MML_HTMLorMML-full">' +
      '</script>';
  var style = '\n<style>\n table, th, td {\n' +
      '  border: 1px solid black; }\n</style>\n';
  return '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">' +
      '<html> <head>\n' +
      '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n' +
      mathjax +
      '\n<title>' + this.information + '</title>\n' + style +
      '\n</head>\n<body>\n';
};


/**
 * @override
 */
sre.AbstractRuleTest.prototype.footer = function() {
  return '\n</body>\n</html>';
};

