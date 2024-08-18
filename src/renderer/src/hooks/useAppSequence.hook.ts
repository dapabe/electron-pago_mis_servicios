import { AppSequenceProvider } from '#renderer/contexts/app-sequence.ctx'
import { useContext } from 'react'

export const useAppSequence = () => {
  const ctx = useContext(AppSequenceProvider.CTX)
  if (!ctx) throw new Error("'useAppSequence' is not used inside of AppSequenceProvider")
  return ctx
}
