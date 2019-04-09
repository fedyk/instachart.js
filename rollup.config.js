import typescript from "rollup-plugin-typescript2";
import compiler from "@ampproject/rollup-plugin-closure-compiler";

export default {
  input: "./src/index.ts",
  
  output: {
    file: "./dist/index.iife.js",
    format: "iife",
    name: "library"
  },

	plugins: [
    typescript({
      objectHashIgnoreUnknownHack: true
    }),
    // compiler(),
	]
}
