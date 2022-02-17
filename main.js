const $ = selector => document.querySelector(selector)

const $js = $("#js")
const $css = $("#css")
const $html = $("#html")

const update = () => {
  const html = createHtml()
  $('iframe').setAttribute('srcdoc', html)
}
const createHtml = () => {
  const html = $html.value
  const css = $css.value
  const js = $js.value

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