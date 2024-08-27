/**
 *  For some reason doesnt work on the electron side
 */
export const sleep = async (ms?: 5000) => {
  return await new Promise<void>((r) => setTimeout(r, ms))
}
