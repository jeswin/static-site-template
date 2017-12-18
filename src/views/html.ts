type Args = { title: string, content: string };
export default function({ title, content }: Args): string {
  return `
    <!doctype html>
    <html lang=en>
      <head>
        <meta charset=utf-8>
        <title>${title}</title>
      </head>
      <body>
        ${content}
      </body>
    </html>
    `;
}
