import { useCounter } from '@uidotdev/usehooks'
import { createContext, ReactNode } from 'react'

type Tab = {
  isDisabled?: boolean
  title: string
  body: ReactNode
}

type Props = {
  label?: string
  selectedTab?: number | null
  beforeChange?: (title: string) => void
  tabs: Tab[]
}

export const TabPanel = ({ tabs, label, selectedTab, beforeChange }: Props) => {
  const [count, { set }] = useCounter(selectedTab ?? 0)

  return (
    <TabPanel.Context.Provider
      value={{
        goToTab: set
      }}
    >
      <section className="tabs">
        <menu role="tablist" aria-label={label}>
          {tabs.map((x, idx) => (
            <button
              key={idx}
              role="tab"
              aria-controls={idx.toString()}
              aria-selected={count === idx ? 'true' : 'false'}
              disabled={x.isDisabled}
              onClick={() => {
                beforeChange?.(x.title)
                set(idx)
              }}
            >
              {x.title}
            </button>
          ))}
        </menu>
        {tabs.map((x, idx) => (
          <article key={idx} role="tabpanel" id={idx.toString()} hidden={count !== idx}>
            {x.body}
          </article>
        ))}
      </section>
    </TabPanel.Context.Provider>
  )
}

type ITabPanelContext = {
  goToTab: (tabIndex: number) => void
}
const CTX = createContext<ITabPanelContext | null>(null)

TabPanel.Context = CTX
