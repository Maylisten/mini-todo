/// <reference types="vite/client" />

declare interface Task {
  id: string;
  title: string;
  description: string;
}

interface Window {
  localApi: {
    task: {
      save: (param: { title: string, description: string }, timestamp: number) => Promise<Task>;
      list: () => Promise<Record<number, Record<"complete" | "uncomplete", Task[]>>>;
      remove: (id: string) => Promise<void>;
      removeByBatch: (ids: string[]) => Promise<void>;
      complete: (id: string) => Promise<void>;
      completeByBatch: (ids: string[]) => Promise<void>;
      restore: (id: string) => Promise<void>;
      changeOrder: (fromTimestamp: number, fromIndex: number, toTimestamp: number, toIndex: number) => Promise<void>;
      update: (task: Task) => Promise<void>;
      changeDate: (id: string, date: Date) => Promise<void>;
    },
    native: {
      showWindow: (windowName: string) => Promise<void>;
    }
  },
}
