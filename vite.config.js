import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import jsconfigPaths from "vite-jsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  // ---- Add config resolve alias ----
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
