import { BrowserWindow } from 'electron'
import { BrowserContext } from 'playwright-core'

export class Sequence {
  #BrWindow: BrowserWindow
  #CTX: BrowserContext

  constructor(browser: BrowserWindow) {
    this.#BrWindow = browser
  }

  public initialize() {}
}
