import {app} from "electron";
import {TaskService} from "./task.ts";
import {JSONFilePreset} from "lowdb/node";
import {Task} from "../../entity/Task.ts";
import {DB_PATH} from "../../config.ts";
import {NativeService} from "./native.ts";

let serviceManager: ServiceManager | null = null;

export async function getServiceManager() {
  if (!serviceManager) {
    await app.whenReady();
    serviceManager = new ServiceManager();
  }
  return serviceManager;
}

export interface DbStructure {
  todo: Record<number, Record<"complete" | "uncomplete", Task[]>>
}

export const dbStructureTemplate: DbStructure = {
  todo: {}
};

export async function readOrCreateDb() {
  return JSONFilePreset(DB_PATH, dbStructureTemplate);
}

class ServiceManager {
  taskService: TaskService;
  nativeService: NativeService;

  constructor() {
    this.taskService = new TaskService();
    this.nativeService = new NativeService();
  }
}
