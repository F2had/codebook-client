import { useState, useEffect } from "react";

import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizeable from "./Resizable";
import bundle from "../Bundler";
import { Cell } from "../Types";
import { useActions } from "../Hooks/useActions";

interface CodeCellProps {
  cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const { updateCell } = useActions();
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output?.code ?? "");
      setErr(output?.err ?? "");
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizeable direction="vertical" width={Infinity} height={300}>
      <div style={{ height: "calc(100% - 10px)", display: "flex", flexDirection: "row" }}>
        <Resizeable direction="horizontal" width={Infinity} height={300}>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizeable>

        <Preview code={code} err={err} />
      </div>
    </Resizeable>
  );
};

export default CodeCell;
