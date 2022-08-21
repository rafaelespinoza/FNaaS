import test from 'ava'
import CalculateFibonacciNumbers from '../src/fibonacci.js'

function runTest (t, lo, hi, expected) {
  const actual = CalculateFibonacciNumbers(lo, hi)

  if (expected.Err != null) {
    t.truthy(actual.Err)
    t.regex(actual.Err.message, new RegExp(expected.Err.message))
  } else {
    t.falsy(actual.Err)
  }
  t.is(actual.Results.length, expected.Results.length)

  actual.Results.forEach((got, ind) => {
    t.is(got, expected.Results[ind], `index ${ind}`)
  })
}

test('rejects NaN', (t) => {
  runTest(t, NaN, 3, { Results: [], Err: new Error('NaN') })
  runTest(t, 0, NaN, { Results: [], Err: new Error('NaN') })
})

test('range errors', (t) => {
  runTest(t, 3, 0, { Results: [], Err: new Error('hi') })
  runTest(t, -1, 3, { Results: [], Err: new Error('lo') })
  runTest(t, 0, 999999999999, { Results: [], Err: new Error('must be <=') })
})

test('it works', (t) => {
  runTest(t, 0, 5, { Results: [0, 1, 1, 2, 3] })
  runTest(t, 5, 10, { Results: [5, 8, 13, 21, 34] })
  runTest(t, 20, 25, { Results: [6765, 10946, 17711, 28657, 46368] })
  runTest(t, 0, 22, { Results: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946] })
})
