const mongoose = require("mongoose");

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_DB_NAME, NODE_ENV } =
  process.env;
mongoose.Promise = global.Promise;
mongoose.set("debug", true); // Will add the Mongo actions on the console
mongoose.set("useFindAndModify", false);

const connectToDb = async () => {
  const URI = `mongodb${
    NODE_ENV !== "development" ? "+srv" : ""
  }://${MONGO_HOST}.mongodb.net`;

  const options = {
    poolSize: 5,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: MONGO_USERNAME,
    pass: MONGO_PASSWORD,
    dbName: MONGO_DB_NAME,
  };

  const dbs = await mongoose.connect(URI, options);

  if (dbs.connections[0].readyState === 1) {
    console.log("🌴 Connected to MongoDB 🌴");
  }
};

module.exports = connectToDb;
