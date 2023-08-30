import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { Plugin, PluginOption } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";

export const VitePluginStyles = vanillaExtractPlugin as () => Plugin;

export const VitePluginTs = (tsConfigPath: string) =>
  viteTsConfigPaths({
    root: tsConfigPath
  }) as Plugin;

export const ViteWebEss = (path: string) =>
  [react(), VitePluginStyles(), VitePluginTs(path)] as PluginOption[];
