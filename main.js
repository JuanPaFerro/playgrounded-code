import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

import Split from "split-grid";
import { encode, decode } from "js-base64";

const $ = (selector) => document.querySelector(selector);
const $js = $("#js");
const $css = $("#css");
const $html = $("#html");

Split({
  columnGutters: [
    {
      track: 1,
      element: $(".vertical-gutter"),
    },
  ],
  rowGutters: [
    {
      track: 1,
      element: $(".horizontal-gutter"),
    },
  ],
});

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "css") return new cssWorker();
    if (label === "html") return new htmlWorker();
    if (label === "typescript" || label === "javascript") return new tsWorker();

    return new editorWorker();
  },
};

//initialize
const { pathname } = window.location;
if (!pathname.includes("|")) {
  window.location.pathname = "/||";
}
const [encodedHtml, encodedCss, encodedJs] = pathname.slice(1).split("|");

const html = decode(encodedHtml);
const css = decode(encodedCss);
const js = decode(encodedJs);

const htmlEditor = monaco.editor.create($html, {
  value: html,
  language: "html",
  theme: "vs-dark",
});
const cssEditor = monaco.editor.create($css, {
  value: css,
  language: "css",
  theme: "vs-dark",
});
const jsEditor = monaco.editor.create($js, {
  value: js,
  language: "javascript",
  theme: "vs-dark",
});

htmlEditor.onDidChangeModelContent(update);
cssEditor.onDidChangeModelContent(update);
jsEditor.onDidChangeModelContent(update);

const htmlToProcess = createHtml({ html, js, css });
$("iframe").setAttribute("srcdoc", htmlToProcess);
//initialize

function update() {
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  const codeToURL = `${encode(html)}|${encode(css)}|${encode(js)}`;
  history.replaceState(null, null, `/${codeToURL}`);

  const htmlToProcess = createHtml({ html, js, css });
  $("iframe").setAttribute("srcdoc", htmlToProcess);
}
function createHtml({ html, js, css }) {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script> ${js} </script>
      </body>
    </html>`;
}
