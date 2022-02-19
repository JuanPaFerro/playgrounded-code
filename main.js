import { createEditor } from "./editor";
import { $ } from "./utilities/dom-managment";
import Split from "split-grid";
import { encode, decode } from "js-base64";

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

const { pathname } = window.location;
!pathname.includes("|") && (window.location.pathname = "/||");
const [encodedHtml, encodedCss, encodedJs] = pathname.slice(1).split("|");

const $js = $("#js");
const $css = $("#css");
const $html = $("#html");

const html = decode(encodedHtml) ?? "";
const css = decode(encodedCss) ?? "";
const js = decode(encodedJs) ?? "";
console.log(html, css, js);

const htmlToProcess = createHtml({ html, js, css });
$("iframe").setAttribute("srcdoc", htmlToProcess);

const htmlEditor = createEditor({
  element: $html,
  value: html,
  language: "html",
});
const cssEditor = createEditor({
  element: $css,
  value: css,
  language: "css",
});
const jsEditor = createEditor({
  element: $js,
  value: js,
  language: "javascript",
});

htmlEditor.onDidChangeModelContent(update);
cssEditor.onDidChangeModelContent(update);
jsEditor.onDidChangeModelContent(update);

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
