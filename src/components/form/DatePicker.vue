<template>
  <Popper ref="datePicker" :arrow="true">
    <slot>
      <button type="button" class="btn btn-sm btn-primary btn-outline" :class="{'btn-disabled': disabled}">
        <CalendarIcon class="text-base"/>
        <span class="text-sm">{{ showDateStr }}</span>
      </button>
    </slot>
    <template #content>
      <div class="flex flex-col w-[290px] py-3 items-center">
        <div v-for="quickSelect of quickSelectList" :key="quickSelect.label" @click="quickSelectDate(quickSelect.date)"
             class="flex flex-row items-center w-full gap-1.5 px-3 py-2 hover:cursor-pointer hover:bg-base-content/10">
          <Component :is="quickSelect.icon" class="text-xl"/>
          <span>{{ quickSelect.label }}</span>
          <span class="ml-auto text-base-content/50">{{ quickSelect.weekDay }}</span>
        </div>
        <div class="w-fit flex flex-col items-center mt-3">
          <VueDatePicker v-model="modelDate" :inline="true" :enable-time-picker="false"
                         :teleport="true"
                         placeholder="选择日期" :disabled="disabled" :min-date="new Date(todayTimestamp)" :dark="isDark"
                         :auto-apply="true"/>
        </div>
      </div>
    </template>
  </Popper>
</template>

<script setup lang="ts">
import Popper from "vue3-popper";
import CalendarIcon from "@/components/icon/CalendarIcon.vue";
import {computed, toRefs} from "vue";
import dayjs from "dayjs";
import {getBeginTimestamp, getCNDay} from "@/utils";
import TodayIcon from "@/components/icon/TodayIcon.vue";
import SunIcon from "@/components/icon/SunIcon.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import {useThemeStore} from "@/store";
import {storeToRefs} from "pinia";

defineOptions({
  components: {
    TodayIcon,
    SunIcon
  }
});
const modelDate = defineModel({default: new Date(), required: true});
const props = withDefaults(defineProps<{ disabled?: boolean }>(), {
  disabled: false
});
const {disabled} = toRefs(props);

const todayTimestamp = getBeginTimestamp(new Date());
const tomorrowTimestamp = getBeginTimestamp(new Date()) + 24 * 60 * 60 * 1000;
const quickSelectList = [
  {label: "今天", icon: "TodayIcon", date: new Date(todayTimestamp), weekDay: getCNDay(dayjs(todayTimestamp).day())},
  {
    label: "明天",
    icon: "SunIcon",
    date: new Date(tomorrowTimestamp),
    weekDay: getCNDay(dayjs(tomorrowTimestamp).day())
  },
];

const quickSelectDate = (date: Date) => {
  modelDate.value = date;
};

const showDateStr = computed(() => {
  return dayjs(modelDate.value).format("YYYY-MM-DD");
});

const themeStore = useThemeStore();
const {theme} = storeToRefs(themeStore);
const isDark = computed(() => theme.value === "dark");

</script>

<style scoped>

</style>
