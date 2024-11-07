import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  noExternal: ["gigachat"],
  platform: "neutral",
});
