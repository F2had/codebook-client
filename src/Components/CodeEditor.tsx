import MoancoEditor from "@monaco-editor/react";

const CodeEditor = () => {
  return (
    <MoancoEditor
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 14,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
      language="javascript"
      theme="vs-dark"
      height="500px"
    />
  );
};

export default CodeEditor;
