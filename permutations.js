/**
 * @name getPermutations
 * @description get all permutations of the items in the array
 * @param {array} arr an array of values
 * @param {function} testFn (optional) run a filter on results - could save memory
 * @return {array} the permutations (all possible combinations/orders of the elements)
 * WARNING: consumes an exponential amount of memory with each item
 */
export const getPermutations = (arr, testFn = null) => {
  if (arr.length > 10) {
    throw new Error("Sorry, you probably don't have enough memory for that.");
  }

  const permutations = [];

  function swapElements(a, b) {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }

  (function generatePermutation(n, arr) {
    if (n === 1) {
      const clone = [...arr];
      if (typeof testFn !== 'function' || testFn(clone)) {
        permutations.push(clone);
      }
    } else {
      for (let i = 0; i !== n; i++) {
        generatePermutation(n - 1, arr);
        swapElements(n % 2 ? 0 : i, n - 1);
      }
    }
  })(arr.length, arr);

  return permutations;
};
