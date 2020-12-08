import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import copy from "rollup-plugin-copy2";
import zip from "rollup-plugin-zip";
import packageJson from "./package.json";
import {
  chromeExtension,
  simpleReloader,
} from "rollup-plugin-chrome-extension";

export default [
  {
    input: "manifest.json",
    output: {
      name: "quotone",
      dir: "dist",
    },
    external: [...Object.keys(packageJson.dependencies || {}), "fs", "path"],
    plugins: [
      chromeExtension(),
      simpleReloader(),
      copy({
        assets: ["assets/icon48_gray.png"],
      }),
      json(),
      resolve(),
      typescript(),
      zip(),
    ],
  },
];
