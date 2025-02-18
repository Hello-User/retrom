import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { readConfigFile, readLocalCargoToml } from "./src/lib/node-utils";

let localVersion = "0.0.0";
try {
  const cargoTomlVersion = readLocalCargoToml();
  localVersion = cargoTomlVersion;
} catch (e) {
  if (process.env.NODE_ENV === "development") {
    console.error("Failed to read local Cargo.toml:", e);
  }
}

let localServicePort = "5101";
let localServiceHostname = "http://localhost";

const config = readConfigFile();
if (config?.connection?.port) {
  localServicePort = config.connection.port.toString();
}

if (config?.connection?.hostname) {
  localServiceHostname = config.connection.hostname;
}

const localServiceHost =
  process.env.VITE_RETROM_LOCAL_SERVICE_HOST ||
  process.env.RETROM_LOCAL_SERVICE_HOST ||
  `${localServiceHostname}:${localServicePort}`;

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "import.meta.env.VITE_RETROM_VERSION": JSON.stringify(localVersion),
    "import.meta.env.VITE_RETROM_LOCAL_SERVICE_HOST":
      JSON.stringify(localServiceHost),
    "import.meta.env.VITE_RETROM_LOCAL_SERVICE_PORT":
      JSON.stringify(localServicePort),
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: localServiceHost,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  preview: {
    port: 3000,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: localServiceHost,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [TanStackRouterVite(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
