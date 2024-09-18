import { AppSequenceProvider } from '#renderer/contexts/app-sequence.ctx'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from '#renderer/shadcn/ui/navigation-menu'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { FormattedMessage } from 'react-intl'
import { z } from 'zod'
import * as Icon from 'lucide-react'
import { Button } from '#renderer/shadcn/ui/button'

export const Route = createFileRoute('/app/_menu')({
  validateSearch: (sq: Record<string, unknown>) => {
    const sqSchema = z.object({
      page: z.number().positive().optional().catch(1)
    })
    return sqSchema.parse(sq)
  },
  component: Component
})

function Component() {
  const nav = useNavigate()
  return (
    <main>
      <AppSequenceProvider>
        <NavigationMenu>
          <NavigationMenuList className="bg-background rounded">
            <NavigationMenuItem>
              <Button
                variant="ghost"
                className="px-3 gap-x-2"
                onClick={async () => await nav({ to: '/app/home' })}
              >
                <Icon.LucideNotebookPen size={24} />
                <FormattedMessage id="page.app.tab.home.title" />
              </Button>
              <Button
                variant="ghost"
                className="px-3 gap-x-2"
                onClick={async () => await nav({ to: '/app/payMethods' })}
              >
                <Icon.CreditCard size={24} />
                <FormattedMessage id="page.app.tab.payMethods.title" />
              </Button>
              <Button
                variant="ghost"
                className="px-3 gap-x-2"
                onClick={async () => await nav({ to: '/app/services' })}
              >
                <Icon.Landmark size={24} />
                <FormattedMessage id="page.app.tab.services.title" />
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <section className="px-2">
          <Outlet />
        </section>
      </AppSequenceProvider>
    </main>
  )
}
