import app from "./app.js";
import "./config/database";
import "core-js/stable";
import conf from "./config/config-env";

app.listen(conf.APP_PORT, () =>
  console.log(
    `App server listen on port: http://${conf.APP_HOST}:${conf.APP_PORT}, Enviroment ${conf.NODE_ENV}`
  )
);
