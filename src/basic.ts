import { dodgyMultiplyFromOtherModule } from '#src/utils'
export const squared = (n: number) => n * n

const dodgyMultiply = (a: number, b: number) => {
  throw new Error('This function is not implemented yet')
  return a * b
}

export const dodgySquared = (n: number) => {
  return dodgyMultiply(n, n)
}

export const dodgySquaredWithOtherModuleDependency = (n: number) => {
  return dodgyMultiplyFromOtherModule(n, n)
}
