import { PropsWithChildren, ReactNode } from 'react'

type CollapseProps = PropsWithChildren<{
  title: ReactNode
}>

export const Collapse = ({ title, children }: CollapseProps) => {
  return (
    <details>
      <summary>
        <b>{title} &#8595;</b>
      </summary>
      <div className="max-w-[62ch]">{children}</div>
    </details>
  )
}
