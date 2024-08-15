/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv
    extends Partial<{
      BACKEND_ENDPOINT: string
    }> {}
}
