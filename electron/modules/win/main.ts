import {BrowserWindow} from "electron";
import {PRELOAD_PATH, RENDERER_DIST, VITE_DEV_SERVER_URL} from "../../config.ts";
import path from "node:path";

export class MainWindow extends BrowserWindow {

  constructor() {
    super({
      show: true,
      width: 1000,
      height: 700,
      minWidth: 1000,
      minHeight: 700,
      webPreferences: {
        preload: PRELOAD_PATH,
      },
      titleBarStyle: "hidden",
      // alwaysOnTop: true,
      hasShadow: true,
      transparent: true
    });
    // this.webContents.openDevTools();
  }

  async init() {
    if (VITE_DEV_SERVER_URL) {
      await this.loadURL(`${VITE_DEV_SERVER_URL}/#/main/today`);
    } else {
      await this.loadFile(path.join(RENDERER_DIST, `index.html`), {hash: "/main/today"});
    }
  }
}

export async function getMainWindow() {
  const mainWindow = new MainWindow();
  await mainWindow.init();
  return mainWindow;
}
