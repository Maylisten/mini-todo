import {defineStore} from "pinia";
import {ref, watch} from "vue";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref<string>("");
  const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
  const localTheme = window.localStorage.getItem("theme");
  const changeThemeToLight = () => {
    localStorage.setItem("theme", "light");
    theme.value = "light";
  };
  const changeThemeToDark = () => {
    localStorage.setItem("theme", "dark");
    theme.value = "dark";
  };
  const initTheme = () => {
    window.addEventListener("storage", (e) => {
      if (e.key === "theme") {
        theme.value = e.newValue!;
      }
    });
    watch(theme, (value) => {
      document.querySelector("html")?.setAttribute("data-theme", value);
    });
    if (localTheme) {
      theme.value = localTheme;
    } else {
      theme.value = mediaQuery.matches ? "light" : "dark";
    }
  };
  return {theme, changeThemeToLight, changeThemeToDark, initTheme};
});
