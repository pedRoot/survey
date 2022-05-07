import conf from "./config-env";

const whileList = [conf.URL_FRONT];

export default {
  origin: function (origin, callback) {
    if (whileList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      if (whileList.indexOf(origin) !== -1 || !origin) {
        const msgError = `Not allowed by CORS: ${origin} || ${whileList[0]}..`;
        callback(new Error(msgError));
      }
    }
  },
};
