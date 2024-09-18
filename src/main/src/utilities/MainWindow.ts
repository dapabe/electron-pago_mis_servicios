import { is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, BrowserWindowConstructorOptions, ipcMain, shell } from 'electron'
import path from 'node:path'
import { AbstractIpcChannel } from './types/abstract-ipc-channel'

/**
 *  An attempt to Separation of Concerns
 */
export class MainWindow {
  #mainWindow!: BrowserWindow
  #constructionOpts = {
    width: 500,
    height: 400,
    resizable: false,
    frame: false,
    show: false,
    transparent: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux'
      ? {
          icon: path.resolve('resources', 'icon.png?asset')
        }
      : {}),
    webPreferences: {
      preload: path.resolve(__dirname, '..', 'preload', 'index.js'),
      sandbox: false
    }
  } satisfies BrowserWindowConstructorOptions

  /**
   *  Initialize main window creation
   */
  init(asyncChannels: AbstractIpcChannel[]) {
    /**
     *  Default open or close DevTools by F12 in development
     *  and ignore CommandOrControl + R in production.
     *  see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
     */
    app.on('browser-window-created', (_, win) => {
      optimizer.watchWindowShortcuts(win)
    })

    this.#mainWindow = this.#createWindow(this.#constructionOpts)

    /**
     *  Quit when all windows are closed, except on macOS. There, it's common
     *  for applications and their menu bar to stay active until the user quits
     *  explicitly with Cmd + Q.
     */
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    /**
     *  On macOS it's common to re-create a window in the app when the
     *  dock icon is clicked and there are no other windows open.
     */
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.#mainWindow = new BrowserWindow(this.#constructionOpts)
      }
    })

    this.#registerIpcChannels(asyncChannels)

    return this.#mainWindow
  }

  #createWindow(opts: BrowserWindowConstructorOptions) {
    const win = new BrowserWindow(opts)
    win.setMenu(null)

    win.on('ready-to-show', () => {
      win.show()
      win.webContents.openDevTools()
    })

    win.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      win.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      win.loadFile(path.resolve(__dirname, '..', 'renderer', 'index.html'))
    }

    return win
  }

  #registerIpcChannels(channels: AbstractIpcChannel[]) {
    for (const channel of channels) {
      if (Object.hasOwn(channel, 'handleAsync')) {
        ipcMain.handle(channel.channelID, (event, request) => {
          return channel.handleAsync!(event, request)
        })
      }

      if (Object.hasOwn(channel, 'handleSync')) {
        ipcMain.on(channel.channelID, (event, request) => {
          channel.handleSync!(event, request)
        })
      }

      if (Object.hasOwn(channel, 'handleSyncOnce')) {
        ipcMain.once(channel.channelID, (event, request) => {
          channel.handleSyncOnce!(event, request)
        })
      }

      console.log(`Channel ${channel.channelID} registered on App Init.`)
    }
  }
}
