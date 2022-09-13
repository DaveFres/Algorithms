// 12. Integer to Roman
// https://leetcode.com/problems/integer-to-roman/

/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  const map = {
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D',
    1000: 'M',
  };

  // 1 -> I
  // 2 -> II
  // 3 -> III
  // 4 -> IV
  // 5 -> V
  // 6 -> VI
  // 7 -> VII
  // 8 -> VIII
  // 9 -> IX

  const numStr = '' + num;
  const numLength = numStr.length;
  let newNum = '';

  for (let i = 0; i < numStr.length; i++) {
    const digit = Number(numStr[i]);

    const degree = 10 ** (numLength - 1 - i);
    const currParsed = digit * degree;

    if (digit === 0) {
      newNum += '';
    } else if (digit === 4) {
      newNum += map[degree] + map[degree * 5];
    } else if (digit === 9) {
      newNum += map[degree] + map[degree * 10];
    } else if (digit === 1 || digit === 2 || digit === 3) {
      newNum += map[degree].repeat(digit);
    } else if (digit === 5) {
      newNum += map[currParsed];
    } else if (digit === 6 || digit === 7 || digit === 8) {
      const k = digit - 5;
      newNum += map[5 * degree] + map[degree].repeat(k);
    }
  }

  return newNum;
};

console.log('intToRoman :>> ', intToRoman(490));
console.log('intToRoman :>> ', intToRoman(1994));
console.log('intToRoman :>> ', intToRoman(58));

console.log(
  '================================================================ :>> '
);

const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
const rom = [
  'M',
  'CM',
  'D',
  'CD',
  'C',
  'XC',
  'L',
  'XL',
  'X',
  'IX',
  'V',
  'IV',
  'I',
];

var intToRoman2 = function (N) {
  let ans = '';
  for (let i = 0; N; i++) {
    while (N >= val[i]) {
      ans += rom[i];
      N -= val[i];
    }
  }
  return ans;
};

console.log('intToRoman2 :>> ', intToRoman2(690));
