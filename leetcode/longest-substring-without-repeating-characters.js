// 3. Longest Substring Without Repeating Characters (medium)
// https://leetcode.com/problems/longest-substring-without-repeating-characters/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  if (s.length === 0) return 0;

  let currentProcessedEls = [];

  let longest = s[0];

  for (let i = 0; i < s.length; i++) {
    if (!currentProcessedEls.includes(s[i])) {
      currentProcessedEls.push(s[i]);
    } else {
      const previousElIdx = currentProcessedEls.indexOf(s[i]);
      const candidateForLongest = currentProcessedEls.join('');

      if (candidateForLongest.length > longest.length) {
        longest = candidateForLongest;
      }

      currentProcessedEls = currentProcessedEls.slice(previousElIdx + 1);
      currentProcessedEls.push(s[i]);
    }
  }

  if (currentProcessedEls.length > longest.length) {
    const candidateForLongest = currentProcessedEls.join('');

    longest = candidateForLongest;
  }

  return longest.length;
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringOptimized = function (s) {
  if (s.length === 0) return 0;

  let leftIdxs = 0;
  let rightIdxs = 0;
  let longest = 0;

  let map = {};

  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] !== undefined) {
      leftIdxs = Math.max(leftIdxs, map[s[i]] + 1);
    }

    map[s[i]] = i;
    rightIdxs = i;

    const candidateForLongest = rightIdxs - leftIdxs + 1;
    console.log(longest, map, s[i], leftIdxs, rightIdxs);

    if (candidateForLongest > longest) {
      longest = candidateForLongest;
    }
  }

  return longest;
};

console.log(lengthOfLongestSubstring('abcabcbb'));
console.log(lengthOfLongestSubstring('bbbbb'));
console.log(lengthOfLongestSubstring('pwwkew'));
console.log(lengthOfLongestSubstring('au'));
console.log(lengthOfLongestSubstring('abba'));

console.log('================================================================');

console.log(lengthOfLongestSubstringOptimized('abcabcbb'));
console.log(lengthOfLongestSubstringOptimized('bbbbb'));
console.log(lengthOfLongestSubstringOptimized('pwwkew'));
console.log(lengthOfLongestSubstringOptimized('au'));

console.log(lengthOfLongestSubstringOptimized('abba'));
