import { TabPanel } from '#renderer/routes/-components/TabPanel'
import { useContext } from 'react'

export const useTabPanel = () => {
  const ctx = useContext(TabPanel.Context)
  if (!ctx) throw new Error("'useTabPanel' is not inside TabPanel context")
  return ctx
}
