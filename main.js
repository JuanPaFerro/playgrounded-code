const $ = selector => document.querySelector(selector)
import Split from "split-grid"

Split({
  columnGutters: [{
    track: 1,
    element: $('.vertical-gutter'),
  }],
  rowGutters: [{
    track: 1,
    element: $('.horizontal-gutter'),
  }]
})

const $js = $("#js")
const $css = $("#css")
const $html = $("#html")

function initialize() {
  const { pathname } = window.location
  const [encodedHtml, encodedCss, encodedJs] = pathname.slice(1).split("|")

  const html = window.atob(encodedHtml)
  const css = window.atob(encodedCss)
  const js = window.atob(encodedJs)

  $js.value = js
  $css.value = css
  $html.value = html

  const htmlToProcess = createHtml({ html, js, css })
  $('iframe').setAttribute('srcdoc', htmlToProcess)
}

const update = () => {
  const html = $html.value
  const css = $css.value
  const js = $js.value

  const codeToURL = `${window.btoa(html)}|${window.btoa(css)}|${window.btoa(js)}`
  history.replaceState(null, null, `/${codeToURL}`)

  const htmlToProcess = createHtml({ html, js, css })
  $('iframe').setAttribute('srcdoc', htmlToProcess)
}
const createHtml = ({ html, js, css }) => {
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
    </html>`
}

$js.addEventListener('input', update)
$css.addEventListener('input', update)
$html.addEventListener('input', update)

initialize()