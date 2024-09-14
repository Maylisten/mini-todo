import {ipcMain} from "electron";
import {getServiceManager} from "../service";
import {Task} from "../../entity/Task.ts";

export async function addTaskHandler() {
  const {taskService} = (await getServiceManager());

  ipcMain.handle('task:save', (_, task: Task, timestamp: number) => {
    return taskService.save(task, timestamp);
  });

  ipcMain.handle('task:list', () => {
    return taskService.list();
  });

  ipcMain.handle('task:remove', (_, id: string) => {
    return taskService.remove(id);
  });

  ipcMain.handle('task:removeByBatch', (_, ids: string[]) => {
    return taskService.removeByBatch(ids);
  });

  ipcMain.handle('task:complete', (_, id: string) => {
    return taskService.complete(id);
  });

  ipcMain.handle('task:completeByBatch', (_, ids: string[]) => {
    return taskService.completeByBatch(ids);
  });

  ipcMain.handle('task:restore', (_, id: string) => {
    return taskService.restore(id);
  });

  ipcMain.handle('task:changeOrder', (_, fromTimestamp: number, fromIndex: number, toTimestamp: number, toIndex: number) => {
    return taskService.changeOrder(fromTimestamp, fromIndex, toTimestamp, toIndex);
  });

  ipcMain.handle('task:update', (_, task: Task) => {
    return taskService.update(task);
  });

  ipcMain.handle('task:changeDate', (_, id: string, date: Date) => {
    return taskService.changeDate(id, date);
  });
}
