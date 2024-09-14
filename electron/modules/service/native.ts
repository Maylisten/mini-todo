import {getWindowManager} from "../win";

export class NativeService {
  async showWindow(windowName: string) {
    const windowManager = await getWindowManager();
    await windowManager.showWindow(windowName);
  }
}
