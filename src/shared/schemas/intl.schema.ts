import { z } from 'zod'

const S = z.string().min(1)

export const AppIntlSchema = z
  .object({
    appTitle: S,
    language: S,

    'common.yes': S,
    'common.no': S,
    'common.form.username': S,
    'common.form.password': S,
    'common.form.password-repeat': S,
    'common.form.password-forget': S,

    'flags.secure.text': S,
    'flags.secure.label': S,
    'flags.headless.text': S,
    'flags.headless.label': S,

    'root.navBar.home.title': S,
    'root.navBar.settings.title': S,
    'root.navBar.help.title': S,

    'page.unauthorized.register.no-db': S,
    'page.unauthorized.register.has-db': S,
    'page.unauthorized.register.db-file-path': S,
    'page.unauthorized.register.skip-server': S,
    'page.unauthorized.register.submit': S.regex(
      /^\{isSubmitting, select, true \{.+?\} other \{.+?\}\}$/
    ),

    'page.home.tab.verify.title': S,
    'page.home.tab.verify.description': S,
    'page.home.tab.verify.no-services': S,
    'page.home.tab.verify.init': S,
    'page.home.tab.verify.table.col-1': S,
    'page.home.tab.verify.table.col-2': S,
    'page.home.tab.verify.table.col-3': S,
    'page.home.tab.verify.table.with-account': S,
    'page.home.tab.verify.table.no-account': S,
    'page.home.tab.payMethods.title': S,
    'page.home.tab.services.title': S,
    'page.home.tab.services.description': S,
    'page.home.tab.services.tab.add': S,
    'page.home.tab.services.tab.edit': S.includes('{amount}'),

    'errors.service.unavailable': S,
    'errors.service.not-found': S,

    'errors.form.is-empty': S,
    'errors.form.passwords-not-equal': S
  })
  .strict()

export type IAppIntl = z.TypeOf<typeof AppIntlSchema>
