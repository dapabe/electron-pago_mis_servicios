import { IpcEvent } from '#shared/constants/ipc-events'
import { BrowserWindow } from 'electron'
import { chromium } from 'playwright-core'
import { SequenceUtilities } from './Sequence-utils'

export class Sequence extends SequenceUtilities {
  constructor(browser: BrowserWindow) {
    super(browser)
  }

  public async initialize() {
    try {
      this.BRO = await chromium.launch({ headless: process.env.NODE_ENV === 'production' })
      this.CTX = await this.BRO.newContext()
      this.BrWindow.webContents.send(IpcEvent.Sequence.ToggleInternal)

      // this.CTX.on('close', () => this.closePlaywright())

      const page = await this.CTX.newPage()
      await page.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded' })
      await page.close()
      this.closePlaywright()
      // await this.BRO.close()
    } catch (error) {
      console.log(error)
      this.closePlaywright()
    }
  }
}
