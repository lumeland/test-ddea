import Server from "lume/core/server.ts";
import Router from "lume/middlewares/router.ts";
import { escape } from "jsr:@std/html@1.0.4/entities";

const server = new Server({
  root: "./files",
});

const router = new Router();

router.get("/edit", () => {
  return new Response(editContent(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
});

router.post("/edit", async ({ request }) => {
  const data = await request.formData();
  const content = data.get("content");

  if (typeof content === "string") {
    Deno.writeTextFileSync("./files/index.html", content);
  }

  return Response.redirect(new URL("/", request.url));
});

server.use(router.middleware());

server.start();

console.log("Server is running at http://localhost:8000");

function editContent() {
  const content = Deno.readTextFileSync("./files/index.html");

  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Edit document</title>
</head>
<body>
  <form action="/edit" method="post">
    <label for="content">Content of the document</label>
    <textarea name="content" id="content">${escape(content)}</textarea>
    <button>Send changes</button>
  </form>
</body>
</html>`;
}
