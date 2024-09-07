import { TabContent, TabItem, TabList, Tabs } from 'keep-react'
import { ReactNode } from 'react'

type ITabItem = {
  title: ReactNode
  body: ReactNode
}

type ITabPanelProps = {
  initialTab: string
  tabs: ITabItem[]
}

const TabPanel = ({ tabs, initialTab }: ITabPanelProps) => {
  return (
    <Tabs variant="underline" defaultActive={initialTab}>
      <TabList className="bg-metal-700 overflow-x-scroll overflow-y-hidden border-y-0 scrollbar-thin scrollbar-thumb-metal-700 scrollbar-track-metal-900">
        {tabs.map((tab, index) => (
          <TabItem value={index.toString()} key={index} className="text-metal-400">
            {tab.title}
          </TabItem>
        ))}
      </TabList>
      {tabs.map((tab, index) => (
        <TabContent value={index.toString()} key={index} className="px-2">
          {tab.body}
        </TabContent>
      ))}
    </Tabs>
  )
}

export { TabPanel }
