// https://docs.deno.com/runtime/fundamentals/http_server/
// https://docs.deno.com/examples/http_server_files/

import { pages } from "./pages.js";
import * as stats from "./stats.js";
const flag = await Deno.readFile("./favicon.png");

const typejson = {
  "content-type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
};
const typepng = {
  "content-type": "image/png",
  "Access-Control-Allow-Origin": "*",
};
const typetext = {
  "Access-Control-Allow-Origin": "*",
};

const asSlug = (title) =>
  title
    .replace(/\s/g, "-")
    .replace(/[^A-Za-z0-9-]/g, "")
    .toLowerCase();
const titles = new Map(
  Object.keys(pages).map((title) => [asSlug(title), title]),
);

Deno.serve((req) => {
  const url = new URL(req.url);
  stats.log(new Date().toLocaleString(), req.method, url.pathname);
  if (req.method != "GET")
    return new Response("Unsupported", { status: 500, headers: typetext });
  if (url.pathname == "/favicon.png")
    return new Response(flag, { headers: typepng });
  if (url.pathname == "/system/sitemap.json")
    return new Response(sitemap(), { headers: typejson });
  const location = `//fed.wiki/${url.host}/welcome-visitors`;
  if (url.pathname == "/")
    return new Response("", { status: 307, headers: { location } });
  const slug = url.pathname.match(/^\/([a-z-]+)\.json$/);
  if (slug && titles.has(slug[1]))
    return new Response(payload(slug[1]), { headers: typejson });
  console.log({ req, url });
  return new Response("Not Foud", { status: 404, headers: typetext });
});

export function sitemap() {
  const date = Date.now();
  const slugs = [...titles.keys()];
  const infos = slugs.map((slug) => {
    const title = titles.get(slug);
    const synopsis = pages[title][0];
    return { slug, title, date, synopsis };
  });
  return JSON.stringify(infos);
}

function payload(slug) {
  const title = titles.get(slug);
  const story = format(pages[title]);
  const journal = [
    { type: "create", date: Date.now(), item: { title, story } },
  ];
  return JSON.stringify({ title, story, journal });
}

export function format(items) {
  const asitem = (item) => {
    const kind = typeof item;
    switch (kind) {
      case "string":
        return { type: "paragraph", text: item };
      case "object":
        return item;
      case "function":
        return asitem(item());
      default:
        return asitem(`Don't know ${kind}.`);
    }
  };
  const withid = (item) =>
    Object.assign(item, { id: (Math.random() * 10000000000000000).toFixed(0) });

  return items.map(asitem).map(withid);
}
