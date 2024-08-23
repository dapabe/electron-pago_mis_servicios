import { useRouteError } from 'react-router-dom'
import { WindowBody } from '../WindowBody'

export const ErrorBoundary = () => {
  const error = useRouteError()
  console.log(error)
  return <WindowBody>{JSON.stringify(error)}</WindowBody>
}
