import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

import "./TextEditor.css";
const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(true);
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node)) {
        return;
      }

      setEditing(false);
    };
    window.addEventListener("click", listener, { capture: true });
    return () => {
      window.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing)
    return (
      <div ref={ref} className="text-editor card">
        <div className="card-content">
          <MDEditor
            value={value}
            onChange={(value) => {
              setValue(value as string);
            }}
          />
        </div>
      </div>
    );

  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown className="text-editor" source="# Header" />
    </div>
  );
};

export default TextEditor;
