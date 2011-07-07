// Resolved when first fails or all are resolved
// Succeeds if all succeed
// Function will be called only if all preceding arguments succeed
// Function will get value of preceding promise
// Value is values of all promises, if promise return more than one value, then
// values are wrapped into array.

'use strict';

var extend = require('es5-ext/lib/Object/extend').call

  , base   = require('./base');

base = extend(Object.create(base), {
	resolveItem: function (_super, i, r) {
		if (this.resolved.all || this.resolve[i]) {
			return;
		}
		if (r instanceof Error) {
			this.resolved.all = true;
			this.deferred.resolve(r);
		} else {
			_super(this, i, r);
		}
	}
});

module.exports = function () {
	return Object.create(base).init(arguments);
};