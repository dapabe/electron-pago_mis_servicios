import { ReactNode, useState } from 'react'

type Tab = {
  isDisabled?: boolean
  title: string
  body: ReactNode
}

type Props = {
  label?: string
  selectedTab?: string | null
  beforeChange?: (title: string) => void
  tabs: Tab[]
}

export const TabPanel = ({ tabs, label, selectedTab, beforeChange }: Props) => {
  const [currentTab, setTab] = useState(selectedTab ?? tabs[0].title)

  return (
    <section className="tabs">
      <menu role="tablist" aria-label={label}>
        {tabs.map((x) => (
          <button
            key={x.title}
            role="tab"
            aria-controls={x.title}
            aria-selected={currentTab === x.title ? 'true' : 'false'}
            disabled={x.isDisabled}
            onClick={() => {
              beforeChange?.(x.title)
              setTab(x.title)
            }}
          >
            {x.title}
          </button>
        ))}
      </menu>
      {tabs.map((x) => (
        <article key={x.title} role="tabpanel" id={x.title} hidden={currentTab !== x.title}>
          {x.body}
        </article>
      ))}
    </section>
  )
}
