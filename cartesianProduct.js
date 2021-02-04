// helpers
const isEqualArray = (a, b) =>
  a.length === b.length && a.every((v, i) => a[i] === b[i]);

const validateSequence = sequence =>
  sequence.every(
    set =>
      Array.isArray(set) && set.length && isEqualArray(set, [...new Set(set)])
  );

/**
 * @name getCartesianProduct
 * @description n-fold Cartesian product
 * (the set of all ordered tuples that can be created from a sequence of 'n' sets of (variable) 'k' elements)
 * @param {array} sets ordered list of arrays, representing a sequence of sets of elements
 * @return {array} the Cartesian product
 */
export const getCartesianProduct = (...sets) => {
  if (!validateSequence(sets)) {
    throw new TypeError(
      'Arguments must be non-empty arrays containing unique values to produce a Cartesian product.'
    );
  }

  const cardinalities = sets.map(set => set.length - 1); // set maxima (i.e. highest indices: ex. [6, 5, 6])
  const currentPositions = cardinalities.map(() => 0); // set all positions to '0' before counting. ([0, 0, 0])
  const cartesianProduct = []; // i.e. all tuples / combinations

  (function generateTuple() {
    const tuple = [];
    currentPositions.forEach((v, i) => tuple.push(sets[i][v]));

    cartesianProduct.push(tuple);

    const incremented = increment();
    if (incremented) {
      generateTuple();
    }
  })();

  function increment(cIndex = 0) {
    if (currentPositions.every((v, i) => v === cardinalities[i])) {
      return false;
    }

    const setMax = cardinalities[cIndex];
    let setIndex = currentPositions[cIndex];

    if (setIndex === setMax) {
      setIndex = 0;
      currentPositions[cIndex] = setIndex;
      cIndex++;
      increment(cIndex);
    } else {
      setIndex++;
      currentPositions[cIndex] = setIndex;
    }

    return true;
  }

  return cartesianProduct;
};

export default getCartesianProduct;
