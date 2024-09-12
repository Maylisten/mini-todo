/// <reference types="vite/client" />

interface Window {
  api: {
    test: {
      sayHello: () => Promise<string>;
    },
  }
}
