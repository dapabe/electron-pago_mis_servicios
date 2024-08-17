import { app, BrowserWindow, ipcMain } from 'electron'
import { chromium } from 'playwright-core'

export function loadBrowserEvents(browser: BrowserWindow) {
  ipcMain.on('toggle-maximize', () => {
    if (browser.isMinimized()) browser.maximize()
    else browser.minimize()
  })

  ipcMain.on('appVersion', () => console.log(app.getVersion()))

  ipcMain.on('closeApp', () => {
    browser.close()
  })

  ipcMain.on('startSequence', async () => {
    const browser = await chromium.launch({ headless: false })
    const ctx = await browser.newContext()
    const pag = await ctx.newPage()
    await pag.route('*', async (_, req) => {
      console.log(await req.response())
    })
    await pag.goto('https://www.google.com')
  })
}
