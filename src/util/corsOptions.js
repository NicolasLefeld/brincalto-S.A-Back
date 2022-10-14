function defineCorsOptions() {
  const whitelist = [
    "https://brincalto-front.herokuapp.com/",
    "https://brincalto-front.herokuapp.com",
    "http://brincalto-front.herokuapp.com",
    "http://brincalto.com.ar/",
    "https://brincalto.com.ar/",
    "https://brincalto.com.ar",
    "https://brincalto-fe.herokuapp.com/",
    "https://brincalto-fe.herokuapp.com",
    "http://brincalto-fe.herokuapp.com"
  ];

  const corsOptions = {
    origin: function (origin, callback) {
      if (process.env.NODE_ENV === "production") {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          console.log("ORIGIN: ", origin);
          callback(new Error("Not allowed by CORS"));
        }
      } else {
        callback(null, true);
      }
    },
  };

  return corsOptions
}

module.exports = defineCorsOptions;
