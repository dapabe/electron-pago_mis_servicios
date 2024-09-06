import { StepPanel } from '#renderer/routes/-components/StepPanel'
import { useContext } from 'react'

export const useStepPanel = () => {
  const ctx = useContext(StepPanel.CTX)
  if (!ctx) throw new Error("'useStepPanel' is not inside StepPanel context")
  return ctx
}
