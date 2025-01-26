import * as elements from 'typed-html';

const BaseHtml = ({ children }: elements.Children) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>The PoyoWeb!</title>
    </head>
    <body>
      ${children}
      <script src="https://unpkg.com/htmx.org@1.9.12/"></script>
    </body>
  </html>
`

export default BaseHtml;