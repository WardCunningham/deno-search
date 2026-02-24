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
    "Here we show some dynamic content from the server, the date today.",
    () => new Date().toLocaleString(),
    "And we can send messages back to the server.",
    () => prompt("What's Your Good News"),
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
