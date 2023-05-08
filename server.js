// server.js
// Environment: Node.js server

// 在此例子中我们使用 Express.js，
// 但我们也可使用任意其他服务端框架
const express = require("express");
const path = require("path");
const { renderPage } = require("vite-plugin-ssr/server");
const isProduction = true; // = process.env.NODE_ENV === "production";
const root = path.resolve();

startServer();

async function startServer() {
  const app = express();
  console.info("===isProduction", isProduction);
  app.use("*", (req, res, next) => {
    if (/OPTIONS/i.test(req.method)) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST");
      res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization");
    } else {
      next();
    }
  });
  app.use("/config", (req, res, next) => {
    const data = {
      code: 200,
      message: "",
      data: {
        apiServer: process.env.API_SERVER || "",
      },
    };
    res.status(200).type("application/json").send(JSON.stringify(data));
  });
  if (isProduction) {
    app.use(
      express.static(`${root}/dist/client`, {
        maxAge: "7d",
        setHeaders: setCustomCacheControl,
      }),
    );
  } else {
    const { createServer: createSSRServer } = require("vite");
    let vite = await createSSRServer({
      root,
      server: { middlewareMode: true },
    });
    app.use(vite.middlewares);
  }

  app.get("*", async (req, res, next) => {
    const pageContextInit = { urlOriginal: req.originalUrl };
    const pageContext = await renderPage(pageContextInit);
    if (pageContext.httpResponse === null) return next();
    const { body, statusCode, contentType } = pageContext.httpResponse;

    //console.info("res", req.url);
    //res.setHeader("Cache-Control", "public, max-age=" + (7 * 24 * 60 * 60));
    res.status(statusCode).type(contentType).send(body);
  });

  const port = 3000;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
function setCustomCacheControl(res, path) {
  if (/\.(htm|html)$/i.test(path)) {
    res.setHeader("Cache-Control", "public, max-age=0");
  }
}
