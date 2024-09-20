import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import {mainMenuList} from "./mainMenu.ts";
import MainLayout from "@/layout/MainLayout.vue";
import MiniPage from "@/pages/mini/MiniPage.vue";

const routes: Readonly<RouteRecordRaw[]> = [
  {path: '/', redirect: "/detail"},
  {
    path: "/main", component: MainLayout, children: [
      ...mainMenuList
    ]
  },
  {
    path: "/mini",
    component: MiniPage
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});
