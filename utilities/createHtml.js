export const createHtml = ({ html, js, css }) => {
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
};
