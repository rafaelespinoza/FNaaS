import test from 'ava'
import main from '../src/cloudflare-worker'

test('GET /', async (t: any) => {
  const got = main.fetch(
    new Request('http://localhost:8787/test?lo=10&hi=20', { method: 'GET' }),
  )
  t.is(got.status, 200)

  const text: string = await got.text()
  t.is(text, '[55,89,144,233,377,610,987,1597,2584,4181]')
})
