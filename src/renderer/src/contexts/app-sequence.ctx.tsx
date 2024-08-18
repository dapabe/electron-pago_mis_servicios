import { useIpcListener } from '#renderer/hooks/useIpcListener.hook'
import { IpcEvent } from '#shared/constants/ipc-events'
import { useToggle } from '@uidotdev/usehooks'
import { createContext, PropsWithChildren } from 'react'

type IAppSequence = {
  sequenceDisabled: boolean
}

const SequenceContext = createContext<IAppSequence | null>(null)

export const AppSequenceProvider = ({ children }: PropsWithChildren) => {
  const [sequenceDisabled, toggleSeqDisabled] = useToggle(true)

  useIpcListener(IpcEvent.Sequence.ToggleInternal, (_, v) => toggleSeqDisabled(v))

  return (
    <AppSequenceProvider.CTX.Provider
      value={{
        sequenceDisabled
      }}
    >
      {children}
    </AppSequenceProvider.CTX.Provider>
  )
}

AppSequenceProvider.CTX = SequenceContext
