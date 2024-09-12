import {app, ipcMain} from "electron";

let communicationManager: CommunicationManager | null = null;

export async function getCommunicationManager() {
  if (!communicationManager) {
    await app.whenReady();
    communicationManager = new CommunicationManager();
  }
  return communicationManager;
}

class CommunicationManager {
  constructor() {
    this.addTestHandler();
  }

  addTestHandler() {
    ipcMain.handle('test:hello', () => {
      return "world";
    });
  }
}
