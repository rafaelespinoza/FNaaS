import url from 'url'
import CalculateFibonacciNumbers from './fibonacci.js'

/* global Response */

const jsonReplacer = (_key, val) => {
  // Here's another goofy thing about BigInt, it cannot be serialized into JSON
  // without specialized libraries. I would rather not go that far. So instead,
  // just make it a string.
  return typeof val === 'bigint' ? val.toString() : val
}

const makeResponse = (code, body) => (
  new Response(
    JSON.stringify(body, jsonReplacer),
    {
      status: code,
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    }
  )
)

const defaultLo = 0
const defaultHi = 25

const fetch = (request) => {
  if (request.method.toUpperCase() !== 'GET') {
    return makeResponse(405, 'only GET requests accepted')
  }

  // As of 2022-08, Cloudflare wrangler is stupid in that it requires a
  // deprecated node polyfill with this API from the node standard library
  // module, url. @esbuild-plugins/node-modules-polyfill
  /* eslint n/no-deprecated-api: "warn" */
  const uri = url.parse(request.url)
  const uriSearchParams = new URLSearchParams(uri.query)

  const rawLo = uriSearchParams.get('lo')
  let loInd = defaultLo
  if (rawLo !== null) {
    loInd = parseInt(rawLo)
  }

  const rawHi = uriSearchParams.get('hi')
  let hiInd = defaultHi
  if (rawHi !== null) {
    hiInd = parseInt(rawHi)
  }

  const result = CalculateFibonacciNumbers(loInd, hiInd)
  return result.Err
    ? makeResponse(400, result.Err.message)
    : makeResponse(200, result.Results)
}

export default { fetch }
