import { z } from 'zod'

const S = z.string().min(1)

//  Exact string regex example
// /^\{isSubmitting, select, true \{.+?\} other \{.+?\}\}$/

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

    'page.auth.no-db': S,
    'page.auth.has-db': S,
    'page.auth.db-file-path': S,
    'page.auth.skip-server': S,
    'page.auth.submit': S,

    'page.app.tab.home.title': S,
    'page.app.tab.home.description': S,
    'page.app.tab.home.no-services': S,
    'page.app.tab.home.init': S,
    'page.app.tab.home.table.col-1': S,
    'page.app.tab.home.table.col-2': S,
    'page.app.tab.home.table.col-3': S,
    'page.app.tab.home.table.with-account': S,
    'page.app.tab.home.table.no-account': S,
    'page.app.tab.payMethods.title': S,
    'page.app.tab.services.title': S,
    'page.app.tab.services.description': S,
    'page.app.tab.services.tab.add': S,
    'page.app.tab.services.tab.edit': S.includes('{amount}'),
    'page.app.tab.settings.title': S,

    'errors.service.unavailable': S,
    'errors.service.not-found': S,

    'errors.form.is-empty': S,
    'errors.form.passwords-not-equal': S
  })
  .strict()

export type IAppIntl = z.TypeOf<typeof AppIntlSchema>
