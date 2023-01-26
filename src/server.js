import express from "express";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

//o express vai executar na porta 3030
app.listen(3030, () => console.log("server listening on port 3030"));
