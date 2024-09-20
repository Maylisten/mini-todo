import DetailPage from "@/pages/detail/DetailPage.vue";
import CompletePage from "@/pages/complete/CompletePage.vue";
import TodayPage from "@/pages/today/TodayPage.vue";

export const mainMenuList = [
  {path: "/main/today", name: "today", component: TodayPage, meta: {iconComp: "DayIcon", label: "今天"}},
  {path: "/main/detail", name: "detail", component: DetailPage, meta: {iconComp: "ListIcon", label: "清单"}},
  // {path: "/main/calendar", name: "calendar", component: CalendarPage, meta: {iconComp: "CalendarIcon", label: "概览"}},
  {
    path: "/main/complete",
    name: "complete",
    component: CompletePage,
    meta: {iconComp: "CompleteIcon", label: "已完成"}
  },
];
