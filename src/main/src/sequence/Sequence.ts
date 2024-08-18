import { IpcEvent } from '#shared/constants/ipc-events'
import { BrowserWindow } from 'electron'
import { Browser, BrowserContext, chromium } from 'playwright-core'
import { AppStore } from '../app-store'

const appState = AppStore.getState()

export class Sequence {
  #BrWindow: BrowserWindow
  /** Internal browser */
  BRO: Browser | null = null
  /** Incognito context */
  CTX: BrowserContext | null = null

  constructor(browser: BrowserWindow) {
    this.#BrWindow = browser
  }

  public async initialize() {
    this.BRO = await chromium.launch({ headless: appState.fileData.flags.headless })
    this.CTX = await this.BRO.newContext()
    this.#BrWindow.webContents.send(IpcEvent.Sequence.ToggleInternal, false)

    this.BRO.on('disconnected', () =>
      this.#BrWindow.webContents.send(IpcEvent.Sequence.ToggleInternal, true)
    )

    const page = await this.CTX.newPage()
    await page.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded' })
  }
}
