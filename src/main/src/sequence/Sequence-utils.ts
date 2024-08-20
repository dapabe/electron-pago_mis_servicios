import { IpcEvent } from '#shared/constants/ipc-events'
import { ISupportedServices } from '#shared/constants/supported-services'
import { BrowserWindow } from 'electron'
import { Browser, BrowserContext } from 'playwright-core'
import { ServiceNavigation } from '../utilities/ServiceNavigation'

export class SequenceUtilities {
  protected BrWindow: BrowserWindow
  /** Internal browser */
  BRO: Browser | null = null
  /** Incognito context */
  CTX: BrowserContext | null = null

  NavPages: Record<ISupportedServices, ServiceNavigation> = {} as any

  constructor(browser: BrowserWindow) {
    this.BrWindow = browser

    this.NavPages.Aysa = new ServiceNavigation({
      loginURL: 'https://oficinavirtual.web.aysa.com.ar/index.html',
      dashboardURL: 'https://portal.web.aysa.com.ar/index.html'
    })
    this.NavPages.Edesur = new ServiceNavigation({
      loginURL: 'https://ov.edesur.com.ar/login',
      dashboardURL: 'https://ov.edesur.com.ar/mi-cuenta'
    })
    this.NavPages.Telecentro = new ServiceNavigation({
      loginURL: 'https://telecentro.com.ar/sucursal-virtual/login',
      dashboardURL: 'https://telecentro.com.ar/sucursal-virtual/home'
    })
  }

  protected closePlaywright() {
    this.BrWindow.webContents.send(IpcEvent.Sequence.ToggleInternal)
  }
}
