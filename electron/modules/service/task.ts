import {DbStructure, readOrCreateDb} from "./index.ts";
import {Task} from "../../entity/Task.ts";
import {v4 as uuid} from "uuid";
import {Low} from "lowdb";
import {getBeginTimestamp} from "../../utils";

export class TaskService {
  async save(task: Task, timestamp: number) {
    const db = await readOrCreateDb();
    const id = uuid();
    const newTask = new Task(id, task.title, task.description);
    await db.update(({todo}) => {
      if (todo[timestamp]) {
        todo[timestamp].uncomplete.push(newTask);
      } else {
        todo[timestamp] = {complete: [], uncomplete: [newTask]};
      }
    });
    return newTask;
  }

  async list() {
    const db = await readOrCreateDb();
    return db.data.todo;
  }

  async getTask(id: string, db?: Low<DbStructure>) {
    if (!db) {
      db = await readOrCreateDb();
    }
    const todo = db.data.todo;
    for (const key in todo) {
      const targetTask = [...todo[key].complete, ...todo[key].uncomplete].find(task => task.id === id);
      if (targetTask) {
        return targetTask;
      }
    }
  }

  async remove(id: string) {
    const db = await readOrCreateDb();
    await db.update(({todo}) => {
      for (const key in todo) {
        todo[key].complete = todo[key].complete.filter(task => task.id !== id);
        todo[key].uncomplete = todo[key].uncomplete.filter(task => task.id !== id);
        if (todo[key].complete.length === 0 && todo[key].uncomplete.length === 0) {
          delete todo[key];
        }
      }
    });
  }

  async removeByBatch(ids: string[]) {
    const db = await readOrCreateDb();
    await db.update(({todo}) => {
      for (const key in todo) {
        todo[key].complete = todo[key].complete.filter(task => !ids.includes(task.id));
        todo[key].uncomplete = todo[key].uncomplete.filter(task => !ids.includes(task.id));
        if (todo[key].complete.length === 0 && todo[key].uncomplete.length === 0) {
          delete todo[key];
        }
      }
    });
  }

  async complete(id: string) {
    const db = await readOrCreateDb();
    await db.update(({todo}) => {
      for (const timestamp in todo) {
        const targetTaskIndex = todo[timestamp].uncomplete.findIndex(task => task.id === id);
        if (targetTaskIndex >= 0) {
          const targetTask = todo[timestamp].uncomplete[targetTaskIndex];
          todo[timestamp].uncomplete.splice(targetTaskIndex, 1);
          todo[timestamp].complete.push(targetTask);
        }
      }
    });
  }

  async completeByBatch(ids: string[]) {
    const db = await readOrCreateDb();
    await db.update(({todo}) => {
      for (const timestamp in todo) {
        const preCompleteTaskList = todo[timestamp].uncomplete.filter(task => ids.includes(task.id));
        todo[timestamp].uncomplete = todo[timestamp].uncomplete.filter(task => !ids.includes(task.id));
        todo[timestamp].complete = todo[timestamp].complete.concat(preCompleteTaskList);
      }
    });
  }

  async restore(id: string) {
    const db = await readOrCreateDb();
    await db.update(({todo}) => {
      for (const timestamp in todo) {
        const targetTaskIndex = todo[timestamp].complete.findIndex(task => task.id === id);
        if (targetTaskIndex >= 0) {
          const targetTask = todo[timestamp].complete[targetTaskIndex];
          todo[timestamp].complete.splice(targetTaskIndex, 1);
          todo[timestamp].uncomplete.push(targetTask);
        }
      }
    });
  }

  async changeOrder(fromTimestamp: number, fromIndex: number, toTimestamp: number, toIndex: number) {
    const db = await readOrCreateDb();
    const todo = db.data.todo;
    const fromTasks = todo[fromTimestamp].uncomplete;
    let toTasks = todo[toTimestamp].uncomplete;
    if (!toTasks) {
      todo[toTimestamp].uncomplete = toTasks = [];
    }
    if (fromTasks && toTasks) {
      const targetTask = fromTasks[fromIndex];
      fromTasks.splice(fromIndex, 1);
      if (fromTasks.length === 0) {
        delete todo[fromTimestamp];
      }
      toTasks.splice(toIndex, 0, targetTask);
    }
    await db.write();
  }

  async update(task: Task): Promise<void> {
    const db = await readOrCreateDb();
    const targetTask = await this.getTask(task.id, db);
    if (targetTask) {
      targetTask.title = task.title;
      targetTask.description = task.description;
      await db.write();
    }
  }

  async changeDate(id: string, date: Date): Promise<void> {
    const db = await readOrCreateDb();
    const todo = db.data.todo;
    for (const timestamp in todo) {
      const targetTaskIndex = [...todo[timestamp].uncomplete].findIndex(task => task.id === id);
      if (targetTaskIndex !== -1) {
        const toTimestamp = getBeginTimestamp(date);
        if (!todo[toTimestamp]) {
          todo[toTimestamp] = {uncomplete: [], complete: []};
        }
        const fromTimestamp = Number(timestamp);
        const fromTasks = todo[fromTimestamp].uncomplete;
        const toTasks = todo[toTimestamp].uncomplete;
        const targetTask = fromTasks[targetTaskIndex];
        fromTasks.splice(targetTaskIndex, 1);
        toTasks.push(targetTask);
        await db.write();
        return;
      }
    }
  }
}
