import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import cors from "cors";
import corsOptions from "./config/cors";

const app = express();
app.disable("x-powered-by");

app.use(cors(corsOptions));

import * as run from "./libs/setupScripts";
run.createRole();
run.createUser();

Sentry.init({
  dsn: "https://555d24e190a5442c9e4623cf48c3a5cc@o568415.ingest.sentry.io/5713503",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(
  Sentry.Handlers.requestHandler({
    serverName: false,
    user: ["email"],
  })
);
app.use(Sentry.Handlers.tracingHandler());

app.set("pkg", pkg);

app.use(morgan("dev"));
app.use(express.json());

// routes
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    autor: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

export default app;
