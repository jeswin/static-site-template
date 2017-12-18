type Args = { title: string, content: string };
export default function({ title, content }: Args): string {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css">
        <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/grids-responsive-min.css">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css">
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
        <script>hljs.initHighlightingOnLoad();</script>
        <link href="https://fonts.googleapis.com/css?family=Merriweather:300%7CRaleway%7COpen+Sans" rel="stylesheet" type="text/css"></link>
        <link rel="stylesheet" href="/main.css">
        <title>${title}</title>
      </head>
      <body>
        <div id="layout" class="pure-g">
          <div class="sidebar pure-u-1 pure-u-md-1-4">
              <div class="header">
                  <h1>NullAuth</h1>
                  <p>
                    Password-less Authentication and Access Delegation
                  </p>
                  <ul>
                      <li><a href="https://www.nullauth.org">Specification</a></li>
                      <li><a href="https://www.nullauth.org/downloads">Downloads</a></li>
                      <li><a href="https://www.nullauth.org/examples">Examples</a></li>
                      <li><a href="https://github.com/jeswin/nullauth/issues">Discussion</a></li>
                  </ul>
              </div>
          </div>

          <div class="content pure-u-1 pure-u-md-3-4">
          ${content}
          </div>
        </div>
      </body>
    </html>
    `;
}
