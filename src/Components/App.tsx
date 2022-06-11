import * as esbuild from "esbuild-wasm";
import { useState, useRef } from "react";
import CodeEditor from "./CodeEditor";
import { fetchPlugin } from "../plugins/fetch-plugin";
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";

const App = () => {
  const [input, setInput] = useState("");
  const iframe = useRef<HTMLIFrameElement>(null);

  const onClick = async () => {
    //reset the iframe content
    iframe.current!.srcdoc = html;

    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      target: "es2015",
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
        global: "window",
      },
    });
    iframe.current?.contentWindow?.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
  <html>
    <head></head>
    <body>
    <div id="root"></div>
    <script>
    window.addEventListener("message", (event) => {
      const { data } = event;
      try {
        eval(data);
      } catch (e) {
        const root = document.getElementById("root");
        root.innerHTML = '<pre style="color: red;">' + e + '</pre>';
        throw e;
       
      }
    }, false)
    </script>
    </body>
  </html>
  `;

  return (
    <>
      <CodeEditor
        initialValue="//Type your code here."
        onChange={(value) => setInput(value)}
      />
      <div>
        <button className="btn" onClick={onClick}>
          Submit
        </button>
      </div>
      <iframe ref={iframe} srcDoc={html} sandbox="allow-scripts"></iframe>
    </>
  );
};

export default App;
