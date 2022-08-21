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
      results.push(loVal)
    }
    val = loVal + hiVal
    loVal = hiVal
    hiVal = val
  }

  return { Results: results }
}
