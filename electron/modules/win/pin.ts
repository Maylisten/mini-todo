import {BrowserWindow} from "electron";
import {PRELOAD_PATH, RENDERER_DIST, VITE_DEV_SERVER_URL} from "../../config.ts";
import path from "node:path";

export class PinWindow extends BrowserWindow {

  constructor() {
    super({
      show: true,
      width: 400,
      height: 500,
      minWidth: 400,
      minHeight: 500,
      maxWidth: 400,
      maxHeight: 500,
      webPreferences: {
        preload: PRELOAD_PATH,
      },
      titleBarStyle: "hidden",
      alwaysOnTop: true,
      hasShadow: true,
      transparent: true
    });
    // this.webContents.openDevTools();
  }

  async init() {
    if (VITE_DEV_SERVER_URL) {
      await this.loadURL(`${VITE_DEV_SERVER_URL}/#/mini`);
    } else {
      await this.loadFile(path.join(RENDERER_DIST, `index.html`), {hash: "mini"});
    }
  }
}

export async function getPinWindow() {
  const pinWindow = new PinWindow();
  await pinWindow.init();
  return pinWindow;
}
