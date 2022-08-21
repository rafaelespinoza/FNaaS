import test from 'ava'
import main from '../src/cloudflare-worker.js'

/* global Request */

async function runTest (t, querystring, method, expectedCode, expectedMessage) {
  const actual = main.fetch(
    new Request(`http://localhost:8787/${querystring}`, { method })
  )

  t.is(actual.status, expectedCode)

  t.deepEqual(await actual.json(), expectedMessage)
}

test('err', async (t) => {
  await runTest(t, '?lo=one&hi=two', 'GET', 400, 'inputs cannot be NaN')
  await runTest(t, '?lo=10&hi=5', 'GET', 400, 'hi must be <= lo')
  await runTest(t, '?lo=-1&hi=20', 'GET', 400, 'lo must be >= 0')
  await runTest(t, '?lo=2048&hi=2099', 'GET', 400, 'lo is too high')
  await runTest(t, '?lo=1&hi=999999', 'GET', 400, 'hi - lo must be <= 100')
})

test('ok', async (t) => {
  await runTest(t, '?lo=10&hi=20', 'GET', 200, [55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181])
  await runTest(t, '', 'GET', 200, [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368])
})
