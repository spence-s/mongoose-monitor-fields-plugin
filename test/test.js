const test = require('ava');

const monitorFields = require('..');

test('exports a function', t => {
  t.true(typeof monitorFields === 'function');
});
