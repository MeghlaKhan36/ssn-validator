'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValid = isValid;
exports.mask = mask;

/**
 * Social Security number (SSN) is a nine-digit number issued to U.S. citizens, permanent residents,
 * and * temporary (working) residents under section 205(c)(2) of the Social Security Act, codified
 * as 42 U.S.C. 405(c)(2).
 *
 * See `http://www.irs.gov/Individuals/General-ITIN-Information` for more information.
 */

/**
 * Blacklists.
 */

var blacklist = ['078051120', '219099999', '457555462'];

/**
 * Expression.
 */

var expressions = {
  soft: /^(?!666|000|9\d{2})\d{3}[- ]+?(?!00)\d{2}[- ]+?(?!0{4})\d{4}$/,
  strict: /^(?!666|000|9\d{2})\d{3}(?!00)\d{2}(?!0{4})\d{4}$/
};

/**
 * Validate function.
 */

function isValid(ssn) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref$strict = _ref.strict;
  var strict = _ref$strict === undefined ? true : _ref$strict;

  var mode = strict === true ? 'strict' : 'soft';

  if (!expressions[mode].test(ssn)) {
    return false;
  }

  return blacklist.indexOf(ssn.replace(/\D/g, '')) === -1;
}

/**
 * Masks the SSN with "X" placeholders to protect sensitive data,
 * while keeping some of the original digits for contextual recognition.
 *
 * E.g. "123456789" -> "XXXXX6789", "123-45-6789" -> "XXX-XX-6789".
 */

function mask(ssn, options) {
  if (!isValid(ssn, options)) {
    throw new Error('Invalid Social Security Number');
  }

  return '' + ssn.substr(0, ssn.length - 4).replace(/[\w]/g, 'X') + ssn.substr(-4);
}