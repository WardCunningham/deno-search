import * as stats from "./stats.js";

export const pages = {
  "Welcome Visitors": [
    `Welcome to this read-only federated wiki site.,
    From here you can explore a long-running computation as you might any other wiki site.`,
    "Pages about us.",
    { type: "paragraph", id: "63ad2e58eecdd9e5", text: "[[Cunningham, Ward]]" },
    "Pages where we do and share.",
    { type: "paragraph", id: "05e2fa92643677ca", text: "[[Date Today]]" },
  ],
  "Cunningham, Ward": [
    `This site demonstrates my vision for a simple, read-only server.
    It provides user-interfaces pages for a long-running process.
    This follows the MVC pattern with a query statistics accumulator as the model.
    [https://github.com/WardCunningham/deno-search github]."`,
    "See [[Server Diagram]]",
  ],
  "Date Today": [
    "Showing dynamic content from the server, the date today.",
    () => new Date().toLocaleString(),
    "And we hope to send messages back to the server.",
    () => prompt("What's Your Good News"),
    "That will keep us informed as to what it does.",
    () => list(stats.logs),
  ],
  "Server Diagram": [
    "We appear as a remote site to other, full featured, wiki clients. Our parts parallel the classic model-view-controller pattern.",
    { type: "graphviz", text: dot() },
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

function dot() {
  return `
  digraph {
   "wiki\nclients" -> "wiki\nservers"
   node [style=filled fillcolor=gold]
   "wiki\nclients" -> server
   server -> { pages stats }
   pages -> stats
   test -> { server stats }
  }
  `;
}
