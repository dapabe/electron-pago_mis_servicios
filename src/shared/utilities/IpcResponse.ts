import { StatusCodes } from 'http-status-codes'

export class IpcResponse<ResponseType> {
  constructor(
    public status: StatusCodes,
    public data: ResponseType
  ) {}

  isOk() {
    return this.status < 400
  }

  toResult() {
    return this.data
  }
}
