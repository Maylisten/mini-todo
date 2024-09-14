import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {getBeginTimestamp} from "@/utils";

export const useTaskStore = defineStore("task", () => {
  const todayBeginTimestamp = getBeginTimestamp(new Date());
  const tomorrowBeginTimestamp = todayBeginTimestamp + 24 * 60 * 60 * 1000;
  const beginTimestampTaskMap = ref(new Map<number, Record<"complete" | "uncomplete", Task[]>>());
  const beginTimestampUncompletedTaskMap = computed(() => {
    return new Map(
      [...beginTimestampTaskMap.value.entries()]
        .map(([timestamp, {uncomplete}]) => [timestamp, uncomplete] as [number, Task[]])
        .filter(([_, tasks]) => tasks.length > 0)
    );
  });
  const beginTimestampCompletedTaskMap = computed(() => {
    return new Map(
      [...beginTimestampTaskMap.value.entries()]
        .map(([timestamp, {complete}]) => [timestamp, complete] as [number, Task[]])
        .filter(([_, tasks]) => tasks.length > 0)
    );
  });
  const expiredBeginTimestampTaskMap = computed(() => new Map([...beginTimestampUncompletedTaskMap.value.entries()].filter(([timestamp]) => timestamp < todayBeginTimestamp)));
  const futureBeginTimestampTaskMap = computed(() => new Map([...beginTimestampUncompletedTaskMap.value.entries()].filter(([timestamp]) => timestamp >= tomorrowBeginTimestamp)));
  const todayUncompletedTaskList = computed(() => beginTimestampUncompletedTaskMap.value.get(todayBeginTimestamp) ?? []);
  const todayCompletedTaskList = computed(() => beginTimestampCompletedTaskMap.value.get(todayBeginTimestamp) ?? []);
  const completedTaskMap = computed(() => new Map([...beginTimestampTaskMap.value.entries()].map(([timestamp, {complete}]) => [timestamp, complete] as [number, Task[]])));

  const list = async () => {
    const timestampTaskObj = await window.localApi.task.list();
    beginTimestampTaskMap.value = Object.entries(timestampTaskObj)
      .sort(([timestamp1], [timestamp2]) => Number(timestamp1) - Number(timestamp2))
      .reduce((map, [timestamp, taskCollection]) => {
        map.set(Number(timestamp), taskCollection);
        return map;
      }, new Map<number, Record<"complete" | "uncomplete", Task[]>>());
  };
  const save = async (task: { title: string, description: string }, timestamp: number) => {
    await window.localApi.task.save(task, timestamp);
    await list();
  };
  const remove = async (id: string) => {
    await window.localApi.task.remove(id);
    await list();
  };
  const removeByBatch = async (ids: string[]) => {
    await window.localApi.task.removeByBatch(ids);
    await list();
  };
  const complete = async (id: string) => {
    await window.localApi.task.complete(id);
    await list();
  };
  const completeByBatch = async (ids: string[]) => {
    await window.localApi.task.completeByBatch(ids);
    await list();
  };
  const restore = async (id: string) => {
    await window.localApi.task.restore(id);
    await list();
  };
  const changeOrder = async (fromTimestamp: number, fromIndex: number, toTimestamp: number, toIndex: number) => {
    await window.localApi.task.changeOrder(fromTimestamp, fromIndex, toTimestamp, toIndex);
    await list();
  };
  const update = async (task: Task) => {
    await window.localApi.task.update(task);
    await list();
  };
  const changeDate = async (id: string, date: Date) => {
    await window.localApi.task.changeDate(id, date);
    await list();
  };
  return {
    beginTimestampUncompletedTaskMap,
    beginTimestampCompletedTaskMap,
    expiredBeginTimestampTaskMap,
    futureBeginTimestampTaskMap,
    todayUncompletedTaskList,
    todayCompletedTaskList,
    completedTaskMap,
    save,
    list,
    remove,
    complete,
    completeByBatch,
    restore,
    changeOrder,
    update,
    changeDate,
    removeByBatch
  };
});
