import { IpcEvent } from '#shared/constants/ipc-events'
import { BrowserWindow } from 'electron'
import { Browser, BrowserContext } from 'playwright-core'

export class SequenceUtilities {
  protected BrWindow: BrowserWindow
  /** Internal browser */
  BRO: Browser | null = null
  /** Incognito context */
  CTX: BrowserContext | null = null

  constructor(browser: BrowserWindow) {
    this.BrWindow = browser
  }

  protected closePlaywright() {
    this.BrWindow.webContents.send(IpcEvent.Sequence.ToggleInternal)
  }
}
