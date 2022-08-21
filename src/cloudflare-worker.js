import { URL, URLSearchParams } from 'url'
import CalculateFibonacciNumbers from './fibonacci.js'

const makeResponse = (code, body) => (
  new Response(
    JSON.stringify(body),
    {
      status: code,
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    }
  )
)

const fetch = (request) => {
  if (request.method.toUpperCase() !== 'GET') {
    return makeResponse(405, 'only GET requests accepted')
  }

  const uri = new URL(request.url)
  const uriSearchParams = new URLSearchParams(uri.search)

  const rawLo = uriSearchParams.get('lo')
  if (rawLo === null) {
    return makeResponse(400, 'missing required query string param: lo')
  }
  const rawHi = uriSearchParams.get('hi')
  if (rawHi === null) {
    return makeResponse(400, 'missing required query string param: hi')
  }

  const result = CalculateFibonacciNumbers(parseInt(rawLo), parseInt(rawHi))
  return makeResponse(200, result.Results)
}

export default { fetch }
