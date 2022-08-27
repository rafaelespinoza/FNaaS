// All number values in JS are 64-bit double precision floating point, as
// specified in the IEEE 754 standard. To calculate correct Fibonacci numbers
// beyond that limit, use the BigInt primitive. BigInt was added to the
// ECMAScript specification in 2019 or so.
//
// More info is at:
// - https://github.com/tc39/proposal-bigint
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt

// highestSafeFibonacciNumber is the maximum Fibonacci number that can fit into
// a regular JavaScript number. The maximum number that is NOT a Fibonacci
// number is a constant, Number.MAX_SAFE_INTEGER.
const highestSafeFibonacciNumber = 8944394323791464

export default (lo, hi) => {
  const maxResultLength = 100
  const loMax = 1024

  const results = []

  if (Number.isNaN(lo) || Number.isNaN(hi)) {
    const err = new Error('inputs cannot be NaN')
    return { Results: results, Err: err }
  }
  if (hi <= lo) {
    const err = new Error('hi must be <= lo')
    return { Results: results, Err: err }
  }
  if (lo < 0) {
    const err = new Error('lo must be >= 0')
    return { Results: results, Err: err }
  }
  if (lo >= loMax) {
    const err = new Error('lo is too high')
    return { Results: results, Err: err }
  }
  if (hi - lo > maxResultLength) {
    const err = new Error(`hi - lo must be <= ${maxResultLength}`)
    return { Results: results, Err: err }
  }

  let loVal = 0
  let hiVal = 1
  let val

  for (let i = 0; i < hi; i++) {
    if (i >= lo) {
      // Use "loose equality" operator (==, not ===) to be flexible about
      // comparing Number and a BigInt.
      /* eslint eqeqeq: "warn" */
      results.push(loVal == highestSafeFibonacciNumber ? parseInt(loVal) : loVal)
    }

    val = loVal + hiVal

    // Another goofy thing to know about BigInt and Number values is that they
    // can be compared with >= or <= operators without issue. It's only the
    // "strict equality" operator (===) that has an issue, which is why we're
    // using the "loose equality" operator (==) above.
    if (val >= Number.MAX_SAFE_INTEGER) {
      loVal = BigInt(loVal)
      hiVal = BigInt(hiVal)
      val = loVal + hiVal
    }

    loVal = hiVal
    hiVal = val
  }

  return { Results: results }
}
