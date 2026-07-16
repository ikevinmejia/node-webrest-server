import fs from "fs";
import http2 from "http2";

// Lo que solicita
// Lo que responde

// Para crear llave y certificado ssl local
// openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt

const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (req, res) => {
    console.log(req.url);

    //   res.writeHead(200, { "content-type": "text/html" });
    //   res.write("<h1>Hola mundo!</h1>");
    //   res.end();

    //   const data = {
    //     name: "Chrisjen Avasarala",
    //     age: 68,
    //     city: "India",
    //   };

    //   res.writeHead(200, { "content-type": "application/json" });
    //   res.end(JSON.stringify(data));

    if (req.url === "/") {
      const htmlFile = fs.readFileSync("./public/index.html", "utf-8");

      res.writeHead(200, { "content-type": "text/html" });

      res.write(htmlFile);

      res.end();
    } else if (req.url?.endsWith(".js")) {
      const jsFile = fs.readFileSync("./public/script.js", "utf-8");
      res.writeHead(200, { "content-type": "text/javascript" });
      res.end(jsFile);
    } else if (req.url?.endsWith(".css")) {
      const cssFile = fs.readFileSync("./public/style.css", "utf-8");
      res.writeHead(200, { "content-type": "text/css" });
      res.end(cssFile);
    } else {
      res.writeHead(404, { "content-type": "text/html" });
      res.write("<h1>404 - Recurso no encontrado</h1>");
      res.end();
    }
  },
);

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
