import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

export const bundle =  async (rawCode: string) => {
    const result = await esbuild.build({
        entryPoints: ["index.js"],
        bundle: true,
        write: false,
        target: "es2015",
        plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
        define: {
          "process.env.NODE_ENV": JSON.stringify("production"),
          global: "window",
        },
      });
      return result?.outputFiles[0]?.text;
    }

export default bundle;