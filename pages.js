import * as stats from "./stats.js";

export const pages = {
  "Welcome Visitors": [
    "Pages about us.",
    { type: "paragraph", id: "63ad2e58eecdd9e5", text: "[[Cunningham, Ward]]" },
    "Pages where we do and share.",
    { type: "paragraph", id: "05e2fa92643677ca", text: "[[Date Today]]" },
  ],
  "Cunningham, Ward": [
    "I've created this site as a sample read-only server.",
    "See source, [https://github.com/WardCunningham/deno-search github].",
  ],
  "Date Today": [
    "Showing dynamic content from the server, the date today.",
    () => new Date().toLocaleString(),
    "And we hope to send messages back to the server.",
    () => prompt("What's Your Good News"),
    "That will keep us informed as to what it does.",
    () => list(stats.logs),
  ],
};

function prompt(what) {
  return {
    type: "html",
    text: `<form
      action="http://localhost:8000/prompt/"
      style="background-color:#eee; padding:15px;">
    ${what}<br><br>
    <input
      name=title
      size=50
      placeholder="your answer here"><br>
    <input
      type=submit
      value=ok>
    </center>
    </form>`,
  };
}

function list(lines) {
  const type = "html";
  const text = `<pre>${lines.join("\n")}</pre>`;
  return { type, text };
}
