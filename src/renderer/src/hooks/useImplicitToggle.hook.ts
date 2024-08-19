import { useMemo, useState } from 'react'

/**
 *  Starts with `false` \
 *  Returns a `boolean` and a callback toggling it.
 *  @returns [isValid, toggleValid]
 */
export function useImplicitToggle(bool = false): [boolean, () => void] {
  const [b, s] = useState(Boolean(bool))

  //Currying
  const t = useMemo(() => () => s((x) => !x), [])
  return [b, t]
}
