import { StepLine, StepPoint, Steps } from 'keep-react'
import { useCounter } from '@uidotdev/usehooks'
import { createContext, Fragment, ReactNode } from 'react'

type IStepPanelState = {
  goToStep: (value: number) => void
}

const StepPanelContext = createContext<IStepPanelState | null>({
  goToStep: () => void 0
})

type StepItem = {
  title: string
  body: ReactNode
}

type StepPanelsProps = {
  initialStep?: number
  steps: StepItem[]
}

const StepPanel = ({ initialStep = 0, steps }: StepPanelsProps) => {
  const [count, { set }] = useCounter(initialStep)
  return (
    <StepPanelContext.Provider value={{ goToStep: set }}>
      <Steps>
        {steps.map((step, index) => (
          <Fragment key={index}>
            <StepPoint title={step.title} completed={count > index}>
              <p className="flex size-5 items-center justify-center rounded-full border text-body-5 font-medium">
                {index + 1}
              </p>
              <p className="text-sm max-w-[20ch] truncate">{step.title}</p>
            </StepPoint>
            {index !== count && <StepLine completed={count > index} />}
          </Fragment>
        ))}
      </Steps>
      {steps.map((step, index) => (
        <Fragment key={index}>{index === count && step.body}</Fragment>
      ))}
    </StepPanelContext.Provider>
  )
}

StepPanel.CTX = StepPanelContext

export { StepPanel }
