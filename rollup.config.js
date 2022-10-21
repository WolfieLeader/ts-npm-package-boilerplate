import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";
import packageJson from "./package.json" assert { type: "json" };
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import dts from "rollup-plugin-dts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function () {
  const baseOptions = {
    input: "src/index.ts",
    external: Object.keys(packageJson.devDependencies),
  };

  await fs.mkdir(path.join(__dirname, "dist", "cjs"), { recursive: true });
  await fs.writeFile(path.join(__dirname, "dist", "cjs", "package.json"), JSON.stringify({ type: "commonjs" }));
  await fs.mkdir(path.join(__dirname, "dist", "esm"), { recursive: true });
  await fs.writeFile(path.join(__dirname, "dist", "esm", "package.json"), JSON.stringify({ type: "module" }));

  const rollupToCjs = {
    ...baseOptions,
    output: [{ file: packageJson.main, format: "cjs" }],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        target: "es5",
      }),
    ],
  };
  const rollupToEsm = {
    ...baseOptions,
    output: [{ file: packageJson.module, format: "es" }],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
  };
  const rollupToTypes = {
    ...baseOptions,
    output: [{ file: packageJson.types, format: "es" }],
    plugins: [dts()],
  };

  return [rollupToCjs, rollupToEsm, rollupToTypes];
}
