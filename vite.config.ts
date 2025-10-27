import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import babel from "vite-plugin-babel";

export default defineConfig({
  plugins: [
    react(),
    babel({
      babelConfig: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
});
