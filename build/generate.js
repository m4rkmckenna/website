const fs = require('fs');
const {readFile, readdir, writeFile} = fs.promises
const path = require('path');
const yaml = require('js-yaml');
const marked = require('marked');

const frontMatterPattern = /^---\n(?<frontMatterContent>(.*\n)+)^---$/gm;
const slugPattern = /^(?<slug>[a-zA-Z-]+).md$/;
const rootDir = path.join(__dirname, '..');
const postsDir = path.join(rootDir, 'posts');
marked.setOptions({gfm: true, breaks: true, xhtml: true});


function dateComparator(a, b) {
  const aDate = Date.parse(a.date);
  const bDate = Date.parse(b.date);
  return aDate < bDate ? 1 : aDate === bDate ? 0 : -1;
}

async function generatePostData() {
  const postFileNames = await readdir(postsDir);
  const postData = await Promise.all(postFileNames.map(fileName => extractData(postsDir, fileName)));
  return postData.sort(dateComparator)
}

async function extractData(directoryPath, fileName) {
  const filePath = path.join(directoryPath, fileName);
  const data = (await readFile(filePath)).toString();
  const slugMatch = slugPattern.exec(fileName)
  if (slugMatch === null) {
    throw new Error(`Invalid post :: slug [${fileName}]`)
  }
  const slug = slugMatch.groups.slug
  const frontMatterMatch = frontMatterPattern.exec(data);
  if (frontMatterMatch === null) {
    throw new Error(`Invalid post :: front matter [${fileName}]`)
  }
  const frontMatter = yaml.safeLoad(frontMatterMatch.groups.frontMatterContent);
  const html = marked(data.replace(frontMatterPattern, '').trim());
  return {
    ...frontMatter,
    html,
    slug
  };
}

async function writePostData(postData) {
  await writeFile(path.join(rootDir, 'src', 'data', 'posts.json'), JSON.stringify(postData))
}

generatePostData()
  .then(postData => writePostData(postData))
  .catch(e => console.error(e));
