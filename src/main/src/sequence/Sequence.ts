import { IpcEvent } from '#shared/constants/ipc-events'
import { BrowserWindow } from 'electron'
import { chromium } from 'playwright-core'
import { AppStore } from '../app-store'
import { SequenceUtilities } from './Sequence-utils'

export class Sequence extends SequenceUtilities {
  constructor(browser: BrowserWindow) {
    super(browser)
  }

  public async initialize() {
    try {
      this.BRO = await chromium.launch({ headless: AppStore.getState().fileData.flags.headless })
      this.CTX = await this.BRO.newContext()
      this.BrWindow.webContents.send(IpcEvent.Sequence.ToggleInternal, false)

      // this.CTX.on('close', () => this.closePlaywright())

      const page = await this.CTX.newPage()
      await page.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded' })
      // await this.BRO.close()
    } catch (error) {
      console.log(error)
      this.closePlaywright()
    }
  }
}
