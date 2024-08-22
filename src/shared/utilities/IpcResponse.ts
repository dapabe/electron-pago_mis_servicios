import { StatusCodes } from 'http-status-codes'

export class IpcResponse {
  constructor(public status: StatusCodes) {}
}
