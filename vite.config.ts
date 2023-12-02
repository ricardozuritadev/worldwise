import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      constants: "/src/constants",
      components: "/src/components",
      data: "/src/data",
      pages: "/src/pages",
      styles: "/src/styles",
      types: "/src/types"
    }
  },
  server: {
    open: true,
    port: 3000
  }
});
