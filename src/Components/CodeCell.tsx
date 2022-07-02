import { useEffect } from "react";

import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizeable from "./Resizable";

import { Cell } from "../Types";
import { useActions } from "../Hooks/useActions";
import { useTypedSelector } from "../Hooks/UsedTypedSelector";
import "./CodeCell.css";

interface CodeCellProps {
  cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => {
    if (state.bundles) {
      return state.bundles[cell.id];
    }
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }
    const timer = setTimeout(() => {
      createBundle(cell.id, cell.content);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id]);

  return (
    <Resizeable direction="vertical" width={Infinity} height={300}>
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizeable direction="horizontal" width={Infinity} height={300}>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizeable>

        <div className="progress-wrapper">
          {!bundle || bundle.isBundling ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading...
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizeable>
  );
};

export default CodeCell;
