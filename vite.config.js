import { resolve } from "path"
import dts from "vite-plugin-dts"

export default {
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "@webpg/scroll-spy",
      fileName: "ScrollSpy",
      formats: ['es', 'umd'],
    },
  },
}
