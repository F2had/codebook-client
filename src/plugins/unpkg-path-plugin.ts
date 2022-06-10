import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';
import axios from 'axios';

const fileCache = localforage.createInstance({
  name: 'file-cache',
});

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        const { path } = args;

        if(path === 'index.js') {
          return {
            path: 'index.js',
            namespace: 'a',
          }
        }

        if(path.includes('./') || path.includes('../')) {
          return {
            path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
            namespace: 'a',
          }
        }




        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        }
      });

      
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `import reactDOM from "react-select";`,
          };
        }
        
          console.log('onLoad', args);

          const cachedPackage = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

          if(cachedPackage) {
            console.log('Using cache ', args.path);
            return cachedPackage;
          }

          const {data, request} = await axios.get(args.path);
          
          const result: esbuild.OnLoadResult =  {
            loader: 'jsx',
            contents: data,
            resolveDir: new URL('.', `${request.responseURL}`).pathname,
          }
          console.log('Caching', args.path);
          await fileCache.setItem(args.path, result);

          return result;
        
        
      });
    },
  };
}