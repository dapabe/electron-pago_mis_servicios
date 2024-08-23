import { IpcEvent } from '#shared/constants/ipc-events'
import { BrowserWindow, ipcMain } from 'electron'
import { Sequence } from './sequence/Sequence'
import { ISupportedServices } from '#shared/constants/supported-services'

export async function onSequence() {
  /**
   *  Main application sequence
   */
  const seqInit = async (
    evt: Electron.IpcMainInvokeEvent,
    value: Record<ISupportedServices, boolean>
  ) => {
    const sequence = new Sequence(BrowserWindow.fromWebContents(evt.sender)!)
    await sequence.initialize(value)
  }

  ipcMain.handle(IpcEvent.Sequence.Started, seqInit)

  ipcMain.on(IpcEvent.App.CloseApp, (evt) => {
    ipcMain.removeHandler(IpcEvent.Sequence.Started)
    // ipcMain.removeListener(IpcEvent.Sequence.Started, seqInit)

    BrowserWindow.fromWebContents(evt.sender)?.close()
  })
}
