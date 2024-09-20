import {ipcMain} from "electron";
import {getServiceManager} from "../service";

export async function addNativeHandler() {
  const {nativeService} = (await getServiceManager());

  ipcMain.handle('native:showWindow', (_, windowName: string) => {
    return nativeService.showWindow(windowName);
  });
}
