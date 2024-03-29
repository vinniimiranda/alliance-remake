const express = require("express");

const app = express();
const path = require("path");
const serveStatic = require("serve-static");

const port = process.env.PORT || 8080;

app.use(serveStatic(path.join(__dirname, "/dist/")));
app.get(/.*/, (req, res) => res.sendFile(__dirname + "/dist/index.html"));

app.listen(port);
console.log("Servidor rodando na porta " + port);
