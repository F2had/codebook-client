import * as esbuild from "esbuild-wasm";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./test";
const esbuild_wasmURL = "https://unpkg.com/esbuild-wasm@0.14.43/esbuild.wasm";
(async () => {
  await esbuild.initialize({
    wasmURL: esbuild_wasmURL,
    worker: true,
  });
})();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<React.StrictMode>{<App />}</React.StrictMode>);
