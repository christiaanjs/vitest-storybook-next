export const dodgyMultiplyFromOtherModule = (a: number, b: number): number => {
  console.log('Calling real function')
  throw new Error('This function is not implemented yet')
  return a * b
}
