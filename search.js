// https://docs.deno.com/runtime/fundamentals/http_server/
// https://docs.deno.com/examples/http_server_files/

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

const pages = {
  "welcome-visitors": [
    "Pages about us.",
    { type: "paragraph", id: "63ad2e58eecdd9e5", text: "[[Ward]]" },
    "Pages where we do and share.",
    { type: "paragraph", id: "05e2fa92643677ca", text: "[[Date Today]]" },
  ],
  ward: [
    "I've created this site as a sample read-only server.",
    "See source, [https://github.com/WardCunningham/deno-search github].",
  ],
  "date-today": [
    "Here we show some dynamic content from the server, the date today.",
    () => new Date().toLocaleString(),
  ],
};

Deno.serve((req) => {
  const url = new URL(req.url);
  console.log(new Date().toLocaleString(), req.method, url.pathname);
  if (req.method != "GET")
    return new Response("Unsupported", { status: 500, headers: typetext });
  if (url.pathname == "/favicon.png")
    return new Response(flag, { headers: typepng });
  const slug = url.pathname.match(/^\/([a-z-]+)\.json$/);
  if (slug && slug[1] in pages) return page(slug[1]);
  return new Response("Not Foud", { status: 404, headers: typetext });
});

function page(slug) {
  const title = slug.replaceAll("-", " ");
  const story = format(pages[slug]);
  const journal = [
    { type: "create", date: Date.now(), item: { title, story } },
  ];
  const payload = JSON.stringify({ title, story, journal });
  return new Response(payload, { headers: typejson });
}

function format(items) {
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
