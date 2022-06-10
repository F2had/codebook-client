import * as esbuild from "esbuild-wasm";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./test";

(async () => {
  await esbuild.initialize({
    wasmURL: "/esbuild.wasm",
    worker: true,
  });
})();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<React.StrictMode>{<App />}</React.StrictMode>);
