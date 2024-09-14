import {app} from "electron";
import {addTaskHandler} from "./task.ts";
import {addNativeHandler} from "./navtive.ts";

let controllerManager: ControllerManager | null = null;

export async function getControllerManager() {
  if (!controllerManager) {
    await app.whenReady();
    controllerManager = new ControllerManager();
    await controllerManager.init();
  }
  return controllerManager;
}

class ControllerManager {
  constructor() {
  }

  async init() {
    await addTaskHandler();
    await addNativeHandler();
  }
}
