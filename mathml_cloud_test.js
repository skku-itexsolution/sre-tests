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
 * @fileoverview Testcases resulting from Mathml Cloud project.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MathmlCloudTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.MathmlCloudTest = function() {
  goog.base(this);

  /**
   * @override
   */
  this.information = 'Mathml Cloud tests.';

  /**
   * @override
   */
  this.domain = 'mathspeak';

  /**
   * @override
   */
  this.semantics = true;
};
goog.inherits(sre.MathmlCloudTest, sre.AbstractRuleTest);


/**
 * Testing Chemistry Upper.
 */
sre.MathmlCloudTest.prototype.testMixedIdentifier = function() {
  var mml = '<mrow><mi mathvariant="normal">Si</mi><msub>' +
      '<mi mathvariant="normal">O</mi><mn>2</mn></msub><mo>+</mo><mn>6</mn>' +
      '<mi mathvariant="normal">H</mi><mi mathvariant="normal">F</mi>' +
      '<mo>&#x2192;</mo><msub><mi mathvariant="normal">H</mi><mn>2</mn>' +
      '</msub><mi mathvariant="normal">Si</mi><msub>' +
      '<mi mathvariant="normal">F</mi><mn>6</mn></msub><mo>+</mo><mn>2</mn>' +
      '<msub><mi mathvariant="normal">H</mi><mn>2</mn></msub>' +
      '<mi mathvariant="normal">O</mi></mrow>';
  this.executeRuleTest(mml, 'upper S i upper O 2 plus 6 upper H upper F' +
                       ' right-arrow upper H 2 upper S i upper F 6 plus 2' +
                       ' upper H 2 upper O', 'default');
  this.executeRuleTest(mml, 'upper S i upper O 2 plus 6 upper H upper F' +
                       ' right-arrow upper H 2 upper S i upper F 6 plus 2' +
                       ' upper H 2 upper O', 'brief');
  this.executeRuleTest(mml, 'upper S i upper O 2 plus 6 upper H upper F' +
                       ' R arrow upper H 2 upper S i upper F 6 plus 2 upper' +
                       ' H 2 upper O', 'sbrief');
};


/**
 * Testing Parenthesis with Superscript.
 * Simplified test case for expression 95.
 */
sre.MathmlCloudTest.prototype.testParenSuper = function() {
  var mml = '<mo>(</mo><mi>a</mi><msup><mo>)</mo><mn>2</mn></msup>';
  this.executeRuleTest(mml, 'left-parenthesis a right-parenthesis squared',
                       'default');
  this.executeRuleTest(mml, 'left-p\'ren a right-p\'ren squared', 'brief');
  this.executeRuleTest(mml, 'L p\'ren a R p\'ren squared', 'sbrief');
};


/**
 * Testing Parenthesis with convoluted operator.
 * Simplified test case for expression 98.
 */
sre.MathmlCloudTest.prototype.testParenConvoluted = function() {
  var mml = '<mo>(</mo><mo>-</mo><msup><mi>x</mi><mn>2</mn></msup>' +
          '<mo>/2)</mo>';
  this.executeRuleTest(mml, 'left-parenthesis minus x squared slash' +
                       ' 2 right-parenthesis', 'default');
  this.executeRuleTest(mml, 'left-p\'ren minus x squared slash 2 right-p\'ren',
                       'brief');
  this.executeRuleTest(mml, 'L p\'ren minus x squared slash 2 R p\'ren',
                       'sbrief');
};


/**
 * Testing Superscript Baseline expression in relation-sequence
 * Simplified test case for expression 62.
 */
sre.MathmlCloudTest.prototype.testSupBaseRelseq = function() {
  var mml = '<mrow><msub><mrow><mi>c</mi></mrow><mrow><mn>1</mn></mrow>' +
      '</msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn><mo>-</mo>' +
      '<mn>2</mn><mi>s</mi></mrow></msup><mo>&#x2264;</mo><mfrac>' +
      '<mrow><mn>1</mn></mrow><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>&#x2264;</mo><msub><mrow><mi>c</mi></mrow><mrow><mn>2</mn>' +
      '</mrow></msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn>' +
      '<mo>-</mo><mn>2</mn><mi>s</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'c 1 h Superscript 4 minus 2 s Baseline' +
                       ' less-than-or-equal-to StartFraction 1 Over 2' +
                       ' upper T EndFraction less-than-or-equal-to c 2 h' +
                       ' Superscript 4 minus 2 s', 'default');
  this.executeRuleTest(mml, 'c 1 h Sup 4 minus 2 s Base' +
                       ' less-than-or-equal-to StartFrac 1 Over 2 upper T' +
                       ' EndFrac less-than-or-equal-to c 2 h Sup 4 minus 2 s',
                       'brief');
  this.executeRuleTest(mml, 'c 1 h Sup 4 minus 2 s Base less-than-or-equal-to' +
                       ' Frac 1 Over 2 upper T EndFrac less-than-or-equal-to' +
                       ' c 2 h Sup 4 minus 2 s', 'sbrief');
};


/**
 * Testing Superscript Baseline expression in multi-relation.
 * Simplified test case similar to expression 62.
 */
sre.MathmlCloudTest.prototype.testSupBaseMultirel = function() {
  var mml = '<mrow><msub><mrow><mi>c</mi></mrow><mrow><mn>1</mn></mrow>' +
      '</msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn><mo>-</mo>' +
      '<mn>2</mn><mi>s</mi></mrow></msup><mo>&#x2264;</mo><mfrac><mrow>' +
      '<mn>1</mn></mrow><mrow><mn>2</mn><mi>T</mi></mrow></mfrac><mo>=</mo>' +
      '<msub><mrow><mi>c</mi></mrow><mrow><mn>2</mn></mrow></msub><msup>' +
      '<mrow><mi>h</mi></mrow><mrow><mn>4</mn><mo>-</mo><mn>2</mn>' +
      '<mi>s</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'c 1 h Superscript 4 minus 2 s Baseline' +
                       ' less-than-or-equal-to StartFraction 1 Over 2 upper T' +
                       ' EndFraction equals c 2 h Superscript 4 minus 2 s',
                       'default');
  this.executeRuleTest(mml, 'c 1 h Sup 4 minus 2 s Base less-than-or-equal-to' +
                       ' StartFrac 1 Over 2 upper T EndFrac equals c 2 h Sup' +
                       ' 4 minus 2 s', 'brief');
  this.executeRuleTest(mml, 'c 1 h Sup 4 minus 2 s Base' +
                       ' less-than-or-equal-to Frac 1 Over 2 upper T EndFrac' +
                       ' equals c 2 h Sup 4 minus 2 s', 'sbrief');

};


/**
 * Testing Subscript Baseline expression in relation-sequence
 * Simplified test case for expressions similar to 62.
 */
sre.MathmlCloudTest.prototype.testSubBaseRelseq = function() {
  var mml = '<msub><mi>h</mi><mi>s</mi></msub><mo>&#x2264;</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>&#x2264;</mo><msub><mi>h</mi><mi>s</mi></msub>';
  this.executeRuleTest(mml, 'h Subscript s Baseline less-than-or-equal-to' +
                       ' StartFraction 1 Over 2 upper T EndFraction' +
                       ' less-than-or-equal-to h Subscript s', 'default');
  this.executeRuleTest(mml, 'h Sub s Base less-than-or-equal-to StartFrac' +
                       ' 1 Over 2 upper T EndFrac less-than-or-equal-to h' +
                       ' Sub s', 'brief');
  this.executeRuleTest(mml, 'h Sub s Base less-than-or-equal-to Frac 1 Over' +
                       ' 2 upper T EndFrac less-than-or-equal-to h Sub s',
                       'sbrief');
};


/**
 * Testing Subscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 62.
 */
sre.MathmlCloudTest.prototype.testSubBaseMultirel = function() {
  var mml = '<msub><mi>h</mi><mi>s</mi></msub><mo>&#x2264;</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>=</mo><msub><mi>h</mi><mi>s</mi></msub>';
  this.executeRuleTest(mml, 'h Subscript s Baseline less-than-or-equal-to' +
                       ' StartFraction 1 Over 2 upper T EndFraction' +
                       ' equals h Subscript s', 'default');
  this.executeRuleTest(mml, 'h Sub s Base less-than-or-equal-to StartFrac' +
                       ' 1 Over 2 upper T EndFrac equals h' +
                       ' Sub s', 'brief');
  this.executeRuleTest(mml, 'h Sub s Base less-than-or-equal-to Frac 1 Over' +
                       ' 2 upper T EndFrac equals h Sub s',
                       'sbrief');
};


/**
 * Testing SubSuperscript Baseline expression in relation-sequence
 * Simplified test case for expressions similar to 62.
 */
sre.MathmlCloudTest.prototype.testSubSuperBaseRelseq = function() {
  var mml = '<msubsup><mi>h</mi><mi>s</mi><mi>t</mi></msubsup>' +
      '<mo>&#x2264;</mo><mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi>' +
      '</mrow></mfrac><mo>&#x2264;</mo><msubsup><mi>h</mi><mi>s</mi>' +
      '<mi>t</mi></msubsup>';
  this.executeRuleTest(mml, 'h Subscript s Superscript t Baseline' +
                       ' less-than-or-equal-to StartFraction 1 Over 2 upper' +
                       ' T EndFraction less-than-or-equal-to h Subscript' +
                       ' s Superscript t', 'default');
  this.executeRuleTest(mml, 'h Sub s Sup t Base less-than-or-equal-to' +
                       ' StartFrac 1 Over 2 upper T EndFrac' +
                       ' less-than-or-equal-to h Sub s Sup t', 'brief');
  this.executeRuleTest(mml, 'h Sub s Sup t Base less-than-or-equal-to Frac' +
                       ' 1 Over 2 upper T EndFrac less-than-or-equal-to' +
                       ' h Sub s Sup t', 'sbrief');
};


/**
 * Testing SubSuperscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 62.
 */
sre.MathmlCloudTest.prototype.testSubSuperBaseMultirel = function() {
  var mml = '<msubsup><mi>h</mi><mi>s</mi><mi>t</mi></msubsup>' +
      '<mo>&#x2264;</mo><mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi>' +
      '</mrow></mfrac><mo>=</mo><msubsup><mi>h</mi><mi>s</mi>' +
      '<mi>t</mi></msubsup>';
  this.executeRuleTest(mml, 'h Subscript s Superscript t Baseline' +
                       ' less-than-or-equal-to StartFraction 1 Over 2 upper' +
                       ' T EndFraction equals h Subscript s Superscript t',
                       'default');
  this.executeRuleTest(mml, 'h Sub s Sup t Base less-than-or-equal-to' +
                       ' StartFrac 1 Over 2 upper T EndFrac' +
                       ' equals h Sub s Sup t', 'brief');
  this.executeRuleTest(mml, 'h Sub s Sup t Base less-than-or-equal-to Frac' +
                       ' 1 Over 2 upper T EndFrac equals h Sub s Sup t',
                       'sbrief');
};


/**
 * Testing Square and Cubes with text children.
 * Test case for expression 18 (adapted to include cubed).
 */
sre.MathmlCloudTest.prototype.testSquareWithText = function() {
  var mml = '<mrow><mfrac><mrow><mtext>area&#x00A0;of&#x00A0;triangle</mtext>' +
      '</mrow><mrow><mtext>area&#x00A0;of&#x00A0;square</mtext></mrow>' +
      '</mfrac><mo>=</mo><mfrac><mrow><msup><mrow>' +
      '<mtext>1&#x00A0;unit</mtext></mrow><mn>2</mn></msup></mrow><mrow>' +
      '<msup><mrow><mtext>16&#x00A0;units</mtext></mrow><mn>3</mn></msup>' +
      '</mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'StartFraction area of triangle Over area of' +
                       ' square EndFraction equals StartFraction 1 unit' +
                       ' squared Over 16 units cubed EndFraction', 'default');
  this.executeRuleTest(mml, 'StartFrac area of triangle Over area of square' +
                       ' EndFrac equals StartFrac 1 unit squared Over 16' +
                       ' units cubed EndFrac', 'brief');
  this.executeRuleTest(mml, 'Frac area of triangle Over area of square' +
                       ' EndFrac equals Frac 1 unit squared Over 16 units' +
                       ' cubed EndFrac', 'sbrief');
};


/**
 * Testing SubSuperscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 62.
 */
sre.MathmlCloudTest.prototype.testFootnoteWithText = function() {
  var mml = '<mrow><mtext>area&#x00A0;of&#x00A0;triangle</mtext>' +
      '<mtext>&#x00A0;</mtext>' +
      '<msup><mrow><mtext>area&#x00A0;of&#x00A0;square</mtext>' +
      '</mrow><mn>1</mn></msup><mtext>&#x00A0;</mtext>' +
      '<msup><mrow><mtext>1&#x00A0;unit</mtext></mrow><mn>2</mn></msup>' +
      '<mtext>&#x00A0;</mtext>' +
      '<msup><mrow><mtext>16&#x00A0;units</mtext></mrow><mn>3</mn></msup>' +
      '</mrow>';
  this.executeRuleTest(mml, 'area of triangle area of square' +
                       ' Superscript 1 Baseline 1 unit Superscript 2' +
                       ' Baseline 16 units Superscript 3', 'default');
  this.executeRuleTest(mml, 'area of triangle area of' +
                       ' square Sup 1 Base 1 unit' +
                       ' Sup 2 Base 16 units Sup 3', 'brief');
  this.executeRuleTest(mml, 'area of triangle area of' +
                       ' square Sup 1 Base 1 unit' +
                       ' Sup 2 Base 16 units Sup 3', 'sbrief');
};


/**
 * Testing SubSuperscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 62.
 */
sre.MathmlCloudTest.prototype.testFootnoteWithSimpleText = function() {
  var mml = '<msup><mtext>area&#x00A0;of&#x00A0;triangle</mtext>' +
      '<mn>2</mn></msup>';
  this.executeRuleTest(mml, 'area of triangle Superscript 2', 'default');
  this.executeRuleTest(mml, 'area of triangle Sup 2', 'brief');
  this.executeRuleTest(mml, 'area of triangle Sup 2', 'sbrief');
};
