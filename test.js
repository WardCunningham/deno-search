// usage: deno test --allow-read --allow-net

import { assertEquals } from "jsr:@std/assert";
import * as server from "./server.js";
import * as stats from "./stats.js";

Deno.test("server format", () => {
  const items = ["hello world.", () => Date.now()];
  const story = server.format(items);
  assertEquals(story.length, 2);
  assertEquals(
    story.map((info) => info.type),
    ["paragraph", "paragraph"],
  );
  assertEquals(
    story.map((info) => info.text),
    ["hello world.", "Don't know number."],
  );
});

Deno.test("server sitemap", () => {
  const infos = JSON.parse(server.sitemap());
  assertEquals(infos.length, 4);
  assertEquals(infos.map((info) => info.slug).sort(), [
    "cunningham-ward",
    "date-today",
    "server-diagram",
    "welcome-visitors",
  ]);
});

Deno.test("stats logs", () => {
  stats.log("hello");
  stats.log("world");
  assertEquals(stats.logs, ["hello", "world"]);
});
