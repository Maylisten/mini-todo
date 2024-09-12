import Store from "electron-store";

const store = new Store();

export function storeTestStr() {
  store.set("test:hello", "world");
}
