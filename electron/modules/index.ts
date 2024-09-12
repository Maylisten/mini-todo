import {getWindowManager} from "./win";
import {getApplicationMenu} from "./menu";
import {getCommunicationManager} from "./communication";
import {getApplicationTray} from './tray';

export async function initModules() {
  await getCommunicationManager();
  await getWindowManager();
  await getApplicationMenu();
  await getApplicationTray();
}
