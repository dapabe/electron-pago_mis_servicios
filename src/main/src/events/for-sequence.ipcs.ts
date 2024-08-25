import { IpcEvent } from '#shared/constants/ipc-events'
import { BrowserWindow, ipcMain } from 'electron'
import { Sequence } from '../sequence/Sequence'
import { ISupportedServices } from '#shared/constants/supported-services'

export async function ipcsForSequence() {
  /**
   *  Main application sequence
   */
  ipcMain.handle(
    IpcEvent.Sequence.Started,
    async (evt, servicesToCheck: Record<ISupportedServices, boolean>) => {
      const sequence = new Sequence(BrowserWindow.fromWebContents(evt.sender)!)
      await sequence.initialize(servicesToCheck)
    }
  )
}
