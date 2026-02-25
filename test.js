import { assertEquals } from "jsr:@std/assert";
import * as server from "./server.js";

Deno.test("simple test", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});

Deno.test("format items", () => {
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

Deno.test("sitemap", () => {
  const infos = JSON.parse(server.sitemap());
  assertEquals(infos.length, 3);
  assertEquals(infos.map((info) => info.slug).sort(), [
    "cunningham-ward",
    "date-today",
    "welcome-visitors",
  ]);
});
