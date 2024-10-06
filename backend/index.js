import Express from "express";
import Cors from "cors";
import db from "./src/connection/connection.js";
import routes from "./src/routes/route.js";
import dotenv from "dotenv";

dotenv.config();

const app = Express();

const port = process.env.PORT || 3001;

app.use(Cors());
app.use(Express.json());
db();

app.use("/", routes);

app.listen(port, console.log("Listening at port 3001"));
