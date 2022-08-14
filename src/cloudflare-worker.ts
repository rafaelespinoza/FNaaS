/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { URL, URLSearchParams } from 'url'
import { FibonacciOutputs, CalculateFibonacciNumbers } from './fibonacci'

interface Env {
  // Example binding to KV. Learn more at
  // https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at
  // https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at
  // https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

function makeResponse (code: number, body: number[] | string): Response {
  return new Response(
    JSON.stringify(body),
    {
      status: code,
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    }
  )
}

export default {
  fetch (request: Request): Response {
    if (request.method.toUpperCase() !== 'GET') {
      return makeResponse(405, 'only GET requests accepted')
    }

    const uri = new URL(request.url)
    const uriSearchParams = new URLSearchParams(uri.search)

    const rawLo: string | null = uriSearchParams.get('lo')
    if (rawLo === null) {
      return makeResponse(400, 'missing required query string param: lo')
    }
    const rawHi: string | null = uriSearchParams.get('hi')
    if (rawHi === null) {
      return makeResponse(400, 'missing required query string param: hi')
    }

    const result: FibonacciOutputs = CalculateFibonacciNumbers(parseInt(rawLo), parseInt(rawHi))
    return makeResponse(200, result.Results)
  }
}
