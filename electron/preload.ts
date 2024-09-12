import {ipcRenderer, contextBridge} from 'electron';

contextBridge.exposeInMainWorld('api', {
  test: {
    sayHello: () => {
      return ipcRenderer.invoke('test:hello') as Promise<string>;
    },
  }
});
