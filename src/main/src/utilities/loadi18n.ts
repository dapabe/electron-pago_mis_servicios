import path from 'node:path'
import { PromisedValue } from '#shared/utilities/promised-value'
import fs from 'node:fs/promises'
import { IpcResponse, IpcResponseResult } from '#shared/utilities/IpcResponse'
import { AppIntlSchema, IAppIntl } from '#shared/schemas/intl.schema'
import { ZodError } from 'zod'
import { StatusCodes } from 'http-status-codes'

export async function loadI18n(locale: string) {
  const intlPath = path.resolve('resources', 'intl', `${locale}.json`)
  const [intlErr, intlMessage] = await PromisedValue(
    async () => await fs.readFile(intlPath, 'utf-8')
  )
  let messageResponse: IpcResponseResult<Partial<IAppIntl> | ZodError<IAppIntl>>
  if (intlErr) messageResponse = new IpcResponse(StatusCodes.NOT_FOUND, {}).toResult()

  const validated = AppIntlSchema.safeParse(JSON.parse(intlMessage!))
  if (!validated.success) {
    messageResponse = new IpcResponse(StatusCodes.NOT_ACCEPTABLE, validated.error).toResult()
  } else {
    messageResponse = new IpcResponse(StatusCodes.OK, validated.data).toResult()
  }

  return messageResponse
}
