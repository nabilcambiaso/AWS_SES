import express from "express";
// import { morganMiddleware } from "./middleware/morgan.js";
import router from "./routes/router.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
// =app.use("/", express.static("public"));

const port = 3002;

app.post("/", (request, response) => {
  console.log(request.body);
  const { email } = request.body;
  response.status(200).json({ email });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

