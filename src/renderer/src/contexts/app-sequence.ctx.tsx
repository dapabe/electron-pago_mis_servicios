import { useImplicitToggle } from '#renderer/hooks/useImplicitToggle.hook'
import { useIpcListener } from '#renderer/hooks/useIpcListener.hook'
import { IpcEvent } from '#shared/constants/ipc-events'
import { createContext, PropsWithChildren } from 'react'

type IAppSequence = {
  hasSequenceStarted: boolean
}

const SequenceContext = createContext<IAppSequence | null>(null)

const AppSequenceProvider = ({ children }: PropsWithChildren) => {
  const [hasSequenceStarted, toggleSeqDisabled] = useImplicitToggle(false)

  useIpcListener(IpcEvent.Sequence.ToggleInternal, () => toggleSeqDisabled())

  return (
    <AppSequenceProvider.CTX.Provider
      value={{
        hasSequenceStarted
      }}
    >
      {children}
    </AppSequenceProvider.CTX.Provider>
  )
}

AppSequenceProvider.CTX = SequenceContext

export { AppSequenceProvider }
