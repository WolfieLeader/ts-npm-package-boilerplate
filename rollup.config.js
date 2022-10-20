import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import packageJson from "./package.json" assert { type: "json" };
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const generateRollupConfig = async (format) => {
  const isTypes = format === "types";
  const isCjs = format === "cjs";
  const isEsm = format === "esm";
  const base = {
    input: "src/index.ts",
    external: Object.keys(packageJson.devDependencies),
  };

  if (isTypes) {
    return {
      ...base,
      output: [{ file: packageJson.types, format: "es" }],
      plugins: [dts()],
    };
  } else if (isCjs || isEsm) {
    await fs.writeFile(
      path.join(__dirname, "dist", format, "package.json"),
      isCjs ? JSON.stringify({ type: "commonjs" }) : JSON.stringify({ type: "module" })
    );
    return {
      ...base,
      output: [
        {
          file: isCjs ? packageJson.main : packageJson.module,
          format: isCjs ? "cjs" : "es",
        },
      ],
      plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({
          tsconfig: `./tsconfig.json`,
          target: isCjs ? "es5" : "es6",
        }),
      ],
    };
  }
};

export default async function () {
  await fs.mkdir(path.join(__dirname, "dist", "cjs"), { recursive: true });
  await fs.mkdir(path.join(__dirname, "dist", "esm"), { recursive: true });
  const rollupToCjs = await generateRollupConfig("cjs");
  const rollupToEsm = await generateRollupConfig("esm");
  const rollupToTypes = await generateRollupConfig("types");
  return [rollupToCjs, rollupToEsm, rollupToTypes];
}
