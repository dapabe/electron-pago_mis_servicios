import { BrowserWindow } from 'electron'
import { Browser, BrowserContext, chromium } from 'playwright-core'

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
    this.BRO = await chromium.launch({ headless: false })
    this.CTX = await this.BRO.newContext()
    const page = await this.CTX.newPage()
    await page.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded' })
    console.log(this.#BrWindow)
  }
}
