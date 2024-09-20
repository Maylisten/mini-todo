import {contextBridge, ipcRenderer} from 'electron';
import {Task} from "./entity/Task.ts";

contextBridge.exposeInMainWorld('localApi', {
  task: {
    save: (task: Task, timestamp: number) => {
      return ipcRenderer.invoke('task:save', task, timestamp) as Promise<Task>;
    },
    list: () => {
      return ipcRenderer.invoke('task:list') as Promise<Record<number, Record<"complete" | "uncomplete", Task[]>>>;
    },
    remove: (id: string) => {
      return ipcRenderer.invoke('task:remove', id) as Promise<void>;
    },
    removeByBatch: (ids: string[]) => {
      return ipcRenderer.invoke('task:removeByBatch', ids) as Promise<void>;
    },
    complete: (id: string) => {
      return ipcRenderer.invoke('task:complete', id) as Promise<void>;
    },
    completeByBatch: (ids: string[]) => {
      return ipcRenderer.invoke('task:completeByBatch', ids) as Promise<void>;
    },
    restore: (id: string) => {
      return ipcRenderer.invoke('task:restore', id) as Promise<void>;
    },
    changeOrder: (fromTimestamp: number, fromIndex: number, toTimestamp: number, toIndex: number) => {
      return ipcRenderer.invoke('task:changeOrder', fromTimestamp, fromIndex, toTimestamp, toIndex) as Promise<void>;
    },
    update: (task: Task) => {
      return ipcRenderer.invoke('task:update', task) as Promise<void>;
    },

    changeDate: (id: string, date: Date) => {
      return ipcRenderer.invoke('task:changeDate', id, date) as Promise<void>;
    },
  },
  native: {
    showWindow: (windowName: string) => {
      return ipcRenderer.invoke('native:showWindow', windowName) as Promise<void>;
    },
  }
});
