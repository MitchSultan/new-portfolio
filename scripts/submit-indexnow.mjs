import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const key = process.env.INDEXNOW_KEY;
const urls = process.argv.slice(2);

if (!key) {
  throw new Error("Set INDEXNOW_KEY to the key published at the site root.");
}
if (urls.length === 0) {
  throw new Error(
    "Pass one or more fully-qualified changed URLs, for example https://madebymitch.com/Blog/new-article."
  );
}

const keyFile = path.join(projectRoot, "public", `${key}.txt`);
const publishedKey = (await readFile(keyFile, "utf8")).trim();
if (publishedKey !== key) {
  throw new Error(`IndexNow key file must contain the key: public/${key}.txt`);
}

const parsedUrls = urls.map((value) => new URL(value));
if (parsedUrls.some((url) => url.protocol !== "https:")) {
  throw new Error("IndexNow URLs must use HTTPS.");
}
const hosts = new Set(parsedUrls.map((url) => url.host));
if (hosts.size !== 1) {
  throw new Error("Submit URLs from one host in each IndexNow request.");
}

const host = parsedUrls[0].host;
const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList: parsedUrls.map((url) => url.toString()),
  }),
});

if (![200, 202].includes(response.status)) {
  const details = await response.text();
  throw new Error(`IndexNow request failed (${response.status}): ${details}`);
}

console.log(`IndexNow accepted ${parsedUrls.length} URL(s) for ${host}.`);
