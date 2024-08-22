import { StatusCodes } from 'http-status-codes'

export class IpcResponse<ResponseType> {
  constructor(
    public status: StatusCodes,
    public data: ResponseType
  ) {}

  toResult() {
    return [this.status, this.data]
  }
}

export type IpcResponseType<T> = [StatusCodes, T]
