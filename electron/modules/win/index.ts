import {app, BrowserWindow} from "electron";
import {getPinWindow} from "./pin.ts";
import {getMainWindow} from "./main.ts";

let windowManager: WindowManager | null = null;

export async function getWindowManager() {
  if (!windowManager) {
    await app.whenReady();
    windowManager = new WindowManager();
    await windowManager.init();
  }
  return windowManager;
}

export class WindowManager {
  records: Map<string, BrowserWindow>;
  windowBottStrapMap: Record<string, () => Promise<BrowserWindow>> = {
    "main": getMainWindow,
    "pin": getPinWindow,
  };

  constructor() {
    this.records = new Map();
    this.addAppListeners();
  }

  async init() {
    // 创建窗口
    this.addWindow("pin", await getPinWindow());
    this.addAppListeners();
  }

  addWindow(windowName: string, window: BrowserWindow) {
    if (this.records.has(windowName)) {
      return this.records.get(windowName);
    }
    this.records.set(windowName, window);
    window.on('closed', () => {
      this.records.delete(windowName);
    });
    return window;
  }

  addAppListeners() {
    this.addActiveListener();
  }

  addActiveListener() {
    app.on('activate', () => {
      if (!this.checkIfExistVisibleWindow()) {
        this.showWindow("pin");
      }
    });
  }

  checkIfExistVisibleWindow() {
    return [...this.records.values()].filter(win => win.isVisible()).length > 0;
  }

  async showWindow(windowName: string) {
    const win = this.records.get(windowName);
    if (win) {
      win.show();
      win.moveTop();
    } else {
      if (typeof this.windowBottStrapMap[windowName] === 'function') {
        this.addWindow(windowName, await this.windowBottStrapMap[windowName]());
      }
    }
  }
}
