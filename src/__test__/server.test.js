//importing babel
import 'babel-polyfill';
const mult = require('../server/index');

test('Multiply  3 * 2 to equal 6', async () => {
  expect(mult(3, 2)).toBe(6);
});