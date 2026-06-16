/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DOWNLOADS_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
