import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import packageJson from "./package.json";
import {
  chromeExtension,
  simpleReloader,
} from "rollup-plugin-chrome-extension";

export default [
  // {
  //   input: "src/content_script.ts",
  //   output: {
  //     name: "quotone",
  //     file: "dist/content_script.js",
  //     format: "iife",
  //   },
  //   external: [...Object.keys(packageJson.dependencies || {}), "fs", "path"],
  //   plugins: [json(), resolve(), typescript()],
  // },
  {
    // input: "src/content_script.ts",
    input: "manifest.json",
    output: {
      name: "quotone",
      dir: "dist",
      format: "iife",
    },
    external: [...Object.keys(packageJson.dependencies || {}), "fs", "path"],
    plugins: [
      chromeExtension(),
      simpleReloader(),
      json(),
      resolve(),
      typescript(),
    ],
  },
];
