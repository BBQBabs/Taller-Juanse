import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Ruta relativa para que funcione dentro de Capacitor (Android)
  base: "./",
});
