import {BrowserWindow} from "electron";
import {app} from "electron";
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

  constructor() {
    this.records = new Map();
    this.addAppListeners();
  }

  async init() {
    // 创建窗口
    this.records.set("main", await getMainWindow());
    this.addAppListeners();
  }

  addAppListeners() {
    this.addActiveListener();
  }

  addActiveListener() {
    app.on('activate', () => {
      if (!this.checkIfExistVisibleWindow()) {
        this.showWindow("main");
      }
    });
  }

  checkIfExistVisibleWindow() {
    return [...this.records.values()].filter(win => win.isVisible()).length > 0;
  }

  showWindow(windowName: string) {
    const win = this.records.get(windowName);
    if (win) {
      win.show();
    }
  }
}
