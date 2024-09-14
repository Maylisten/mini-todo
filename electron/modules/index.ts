import {getWindowManager} from "./win";
import {getApplicationMenu} from "./menu";
import {getControllerManager} from "./controller";
import {getServiceManager} from "./service";

export async function initModules() {
  await getControllerManager();
  await getWindowManager();
  await getApplicationMenu();
  // await getApplicationTray();
  await getServiceManager();
}
