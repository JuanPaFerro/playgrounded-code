import * as monaco from "monaco-editor";
import { emmetHTML } from "emmet-monaco-es";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { getState } from "./state";

const { fontSize, lineNumbers, minimap, theme, wordWrap } = getState();

const EDITOR_LAYOUT_OPTIONS = {
  fontSize,
  theme,
  lineNumbers,
  minimap: {
    enabled: minimap,
  },
  wordWrap,
  automaticLayout: true,
  fixedOverflowWidgets: true,
  scrollBeyondLastLine: false,
  roundedSelection: false,
  padding: {
    top: 16,
  },
};

emmetHTML(monaco);

window.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "css") return new cssWorker();
    if (label === "html") return new htmlWorker();
    if (label === "typescript" || label === "javascript") return new tsWorker();

    return new editorWorker();
  },
};

export const createEditor = ({ element, language, value }) => {
  return monaco.editor.create(element, {
    value,
    language,
    ...EDITOR_LAYOUT_OPTIONS,
  });
};
