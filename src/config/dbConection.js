const mongoose = require("mongoose");

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_DB_NAME, MONGO_PORT } =
  process.env;
mongoose.Promise = global.Promise;
mongoose.set("debug", true); // Will add the Mongo actions on the console
mongoose.set("useFindAndModify", false);

const connectToDb = async () => {

  const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin`;

  const options = {
    poolSize: 5,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    const dbs = await mongoose.connect(url, options);
  
    if (dbs.connections[0].readyState === 1) {
      console.log("🌴 Connected to MongoDB 🌴");
    }
  } catch (error) {
    console.log('💥 Error at DB connection 💥', url, options, error);
  }
};

module.exports = connectToDb;
