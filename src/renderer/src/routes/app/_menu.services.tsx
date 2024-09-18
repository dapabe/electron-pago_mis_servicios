import { createFileRoute } from '@tanstack/react-router'
import { FormattedMessage } from 'react-intl'

export const Route = createFileRoute('/app/_menu/services')({
  component: Component
})

function Component() {
  return (
    <div className="space-y-2">
      <p>
        <FormattedMessage id="page.app.tab.services.description" />
      </p>
    </div>
  )
}
