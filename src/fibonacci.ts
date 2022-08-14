export interface FibonacciOutputs {
  Results: number[]
  Err?: Error
}

const maxResultLength = 100

export function CalculateFibonacciNumbers (lo: number, hi: number): FibonacciOutputs {
  const results: number[] = []
  let err: Error

  if (Number.isNaN(lo) || Number.isNaN(hi)) {
    err = new Error('inputs cannot be NaN')
    return { Results: results, Err: err }
  }
  if (hi <= lo) {
    err = new Error('hi must be <= lo')
    return { Results: results, Err: err }
  }
  if (lo < 0) {
    err = new Error('lo must be >= 0')
    return { Results: results, Err: err }
  }
  if (hi - lo > maxResultLength) {
    err = new Error(`hi - lo must be <= ${maxResultLength}`)
    return { Results: results, Err: err }
  }

  let loVal: number = 0
  let hiVal: number = 1
  let val: number

  for (let i: number = 0; i < hi; i++) {
    if (i >= lo) {
      results.push(loVal)
    }
    val = loVal + hiVal
    loVal = hiVal
    hiVal = val
  }

  return { Results: results }
}
