import { ReactNode } from 'react'

type Props = {
  statuses: ReactNode[]
}
export const StatusBar = ({ statuses }: Props) => {
  return (
    <div className="status-bar">
      {statuses.map((x, i) => (
        <p key={i} className="status-bar-field">
          {x}
        </p>
      ))}
    </div>
  )
}
