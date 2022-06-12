import { FC, useRef, useEffect } from "react";

interface PreviewProps {
  code: string;
}

const html = `
<html>
  <head></head>
  <body>
  <div id="root"></div>
  <script>
  window.addEventListener("message", (event) => {
    const { data } = event;
    try {
      console.log("evaluating code...");
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

const Preview: FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // console.log("useEffect Preview => ",code);
    //reset the iframe content
    iframe.current!.srcdoc = html;
    iframe.current?.contentWindow?.postMessage(code, "*");
  }, [code]);
  return (
    <iframe
      title="preview"
      ref={iframe}
      srcDoc={html}
      sandbox="allow-scripts"
    ></iframe>
  );
};

export default Preview;
