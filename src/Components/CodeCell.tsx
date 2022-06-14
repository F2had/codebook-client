import { useState, useEffect } from "react";

import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizeable from "./Resizable";
import bundle from "../Bundler";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output?.code ?? "");
      setErr(output?.err ?? "");
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizeable direction="vertical" width={Infinity} height={300}>
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizeable direction="horizontal" width={Infinity} height={300}>
          <CodeEditor
            initialValue="//Type your code here."
            onChange={(value) => setInput(value)}
          />
        </Resizeable>

        <Preview code={code} err={err} />
      </div>
    </Resizeable>
  );
};

export default CodeCell;
