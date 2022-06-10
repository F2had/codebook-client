import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';
import axios from 'axios';


const fileCache = localforage.createInstance({
  name: 'file-cache',
});

export const fetchPlugin = (input: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
        build.onLoad({ filter: /.*/ }, async (args: any) => {
            console.log('onLoad', args);
     
            if (args.path === 'index.js') {
              console.log('onLoad', input);
              return {
                loader: 'jsx',
                contents: input,
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
        }
    }
};