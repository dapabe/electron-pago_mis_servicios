/**
 * Polyfill fn for error as a value
 */
export async function PromisedValue<T, E = Error>(fn: () => Promise<T>) {
  try {
    const val = await fn()
    return [null, val] as [null, T]
  } catch (error) {
    return [error, null] as [E, null]
  }
}
