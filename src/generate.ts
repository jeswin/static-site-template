import frontMatter = require("front-matter");
import marked = require("marked");
import readDir = require("recursive-readdir");
import path = require("path");
import fs = require("fs");
import promisify = require("nodefunc-promisify");
import htmlView from "./views/html";
import pretty = require("pretty");
import mkdirp = require("mkdirp");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

//Read all front-matter from the content directory.
//All the md files inside the directory are converted to corresponding html files under the /public directory.
async function getContent(contentDir: string) {
  const files = await readDir(contentDir);

  const results = files.map(async f => {
    const data = await readFile(f);
    return {
      filePath: f,
      frontMatter: frontMatter(data.toString())
    };
  });

  return await Promise.all(results);
}

// Ignore the first two args; they're just 'node' and <thisfile>.js
const [inputDir, outputDir] = process.argv.slice(2);

// Make sure the input directory and output directory were specified
if (inputDir && outputDir) {
  const contentDir = path.resolve(inputDir);
  getContent(contentDir).then(
    items =>
      Promise.all(
        items.map(async data => {
          const attributes = data.frontMatter.attributes as {
            [key: string]: string;
          };

          const html = pretty(
            htmlView({
              title: attributes.title,
              content: marked(data.frontMatter.body)
            })
          );

          const publicDir = path.resolve(outputDir);

          //Rename /source/path/post.md -> /public/path/post.html
          const outputPath = data.filePath
            .replace(contentDir, publicDir)
            .replace(/\.md$/, ".html");

          await writeFile(outputPath, html);
        })
      ),
    (err: any) => console.log(err)
  );
} else {
  console.log("Usage is <script.js> inputDir outputDir");
}
