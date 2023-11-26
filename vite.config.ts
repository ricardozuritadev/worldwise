import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      data: "/src/data",
      pages: "/src/pages",
      styles: "/src/styles"
    }
  },
  server: {
    open: true,
    port: 3000
  }
});
