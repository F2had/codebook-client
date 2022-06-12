import { useState, useEffect } from "react";

import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundle from "../Bundler";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  //FIXME: useEffect is not triggered when code changes second time
  useEffect(() => {
    // console.log("useEffect App => ", code);
  }, [code]);

  return (
    <>
      <CodeEditor
        initialValue="//Type your code here."
        onChange={(value) => setInput(value)}
      />
      <div className="level-right">
        <button
          className="button is-primary is-dark is-outlined "
          onClick={onClick}
        >
          Submit
        </button>
      </div>
      <Preview code={code} />
    </>
  );
};

export default CodeCell;
