import { createEditor } from "./editor";
import { encode, decode } from "js-base64";
import { delay } from "./utilities/delay";
import { $ } from "./utilities/dom-managment";
import { createHtml } from "./utilities/createHtml";
import { subscribe } from "./state";
import "./aside";
import "./settings";
import "./grid";

const $js = $("#js");
const $css = $("#css");
const $html = $("#html");

const { pathname } = window.location;
const [encodedHtml, encodedCss, encodedJs] = pathname.slice(1).split("|");

const html = pathname.includes("|") ? decode(encodedHtml) : "";
const css = pathname.includes("|") ? decode(encodedCss) : "";
const js = pathname.includes("|") ? decode(encodedJs) : "";

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

subscribe((state) => {
  const EDITORS = [htmlEditor, cssEditor, jsEditor];
  EDITORS.forEach((editor) => {
    const { minimap, ...restOfOptions } = state;
    const newOptions = { ...restOfOptions, minimap: { enabled: minimap } };
    editor.updateOptions({
      ...editor.getRawOptions(),
      ...newOptions,
    });
  });
});

const UPDATE_DELAY_TIME = 200;
const delayUpdate = delay(update, UPDATE_DELAY_TIME);

htmlEditor.focus();
htmlEditor.onDidChangeModelContent(delayUpdate);
cssEditor.onDidChangeModelContent(delayUpdate);
jsEditor.onDidChangeModelContent(delayUpdate);

function update() {
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  const codeToURL = `${encode(html)}|${encode(css)}|${encode(js)}`;
  window.history.replaceState(null, null, `/${codeToURL}`);

  const htmlToProcess = createHtml({ html, js, css });
  $("iframe").setAttribute("srcdoc", htmlToProcess);
}
