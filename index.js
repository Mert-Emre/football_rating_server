import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import authRouter from "./routes/auth.js";
import userFetchRouter from "./routes/userFetchMatches.js";
import scoreRoute from "./routes/scoreRoute.js";
import "dotenv/config";

import connectDb from "./dbConn.js";
import { client } from "./dbConn.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: [process.env.COOKIE_KEY], secure:true, maxAge:24*60*60*1000}));
app.use(authRouter);
app.use(userFetchRouter);
app.use(scoreRoute);

let db;
connectDb()
  .then((res) => {
    db = res;
    app.listen(3001, () => {
      console.log("App is listening on port 3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });

export { db };
