<template>
  <form class="flex flex-col gap-1.5" @keydown.enter="submit">
    <label class="w-full form-control">
      <input ref="taskTitleInput" v-model="formData.title" type="text" placeholder="任务名称"
             class="w-full border-none pl-0 text-xl font-bold input input-md input-ghost focus:outline-none"
             @input="handleTitleInput"/>
      <div class="p-0 label h-[12px] leading-[12px]">
        <span class="label-text-alt text-[12px] text-error">{{ tip.title }}</span>
      </div>
    </label>
    <input type="text" v-model="formData.description" placeholder="描述"
           class="w-full border-none pl-0 input input-sm text-base-content/80 focus:outline-none"/>
    <div
        class="flex flex-row items-center justify-between border-t-2 pt-4 h-[50px] border-base-content/50 mt-2.5">
      <div>
        <DatePicker v-model="formData.date" :disabled="datePickDisabled"></DatePicker>
      </div>
      <div class="flex flex-row gap-3">
        <button class="btn btn-sm btn-neutral" type="button" @click="cancel">取消</button>
        <button class="btn btn-sm btn-primary" type="button" @click="submit">{{ buttonText }}</button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import {computed, nextTick, onMounted, ref, toRefs} from "vue";
import {useToast} from "vue-toastification";
import {useTaskStore} from "@/store/task.ts";
import {getBeginTimestamp} from "@/utils";

import '@vuepic/vue-datepicker/dist/main.css';
import DatePicker from "@/components/form/DatePicker.vue";

const props = withDefaults(defineProps<{
  defaultTask?: Task,
  date?: Date,
  type?: "add" | "edit",
  dateSelectable?: boolean
}>(), {
  defaultTask: () => ({title: "", description: ""} as Task),
  date: () => new Date(),
  dateSelectable: true,
  type: "add"
});

const {defaultTask, date, type, dateSelectable} = toRefs(props);

const buttonText = computed(() => type.value === "add" ? "确认添加" : "确认修改");

const datePickDisabled = computed(() => !dateSelectable.value);

const emit = defineEmits(["close", "submitted"]);

// Get toast interface
const toast = useToast();

// 表单数据
const formData = ref({
  title: defaultTask.value.title,
  description: defaultTask.value.description,
  date: date.value
});

const tip = ref({
  title: "",
  date: "",
});

// 时间选择
const today = ref(new Date(getBeginTimestamp(new Date())));

// 自动 focus 第一个 input
const taskTitleInput = ref<HTMLInputElement>();

const resetForm = () => {
  formData.value.title = defaultTask.value.title;
  formData.value.description = defaultTask.value.description;
  formData.value.date = date.value;
  tip.value.title = "";
  tip.value.date = "";
  nextTick(() => {
    taskTitleInput.value?.focus();
  });
};
onMounted(() => {
  resetForm();
});

const cancel = () => {
  emit('close');
};

// 输入时去除提示
const handleTitleInput = () => {
  if (formData.value.title !== "") {
    tip.value.title = "";
  }
};

// 表单验证
const checkForm = () => {
  const {title, date} = formData.value;
  if (title === "") {
    tip.value.title = "请输入任务标题";
    return false;
  }
  if (!date || date.getTime() < today.value.getTime()) {
    tip.value.date = "请填入截止时间";
  }
  return true;
};

// 任务提交
const taskStore = useTaskStore();
const {save, update} = taskStore;
const add = async () => {
  try {
    const {title, description, date} = formData.value;
    await save({title, description}, getBeginTimestamp(date));
    toast.success("添加任务成功");
  } catch (e) {
    console.error(e);
    toast.error("添加任务失败");
  }
};

const edit = async () => {
  try {
    const {title, description} = formData.value;
    await update({id: defaultTask.value.id, title, description});
    toast.success("修改任务成功");
  } catch (e) {
    console.error(e);
    toast.error("修改任务失败");
  }
};

const submit = async () => {
  if (!checkForm()) {
    return;
  }
  if (type.value === "add") {
    await add();
  } else {
    await edit();
  }
  resetForm();
  emit('submitted');
};
</script>

<style scoped>

</style>
