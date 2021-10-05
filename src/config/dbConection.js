const mongoose = require("mongoose");

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_DB_NAME } =
  process.env;
mongoose.Promise = global.Promise;
mongoose.set("debug", process.env.ENV === "production" ? false : true);

const connectToDb = async () => {
  const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    const Db = await mongoose.connect(uri, options);

    if (Db.connections[0].readyState === 1) {
      console.log("🌴 Connected to MongoDB 🌴");
    }
  } catch (error) {
    console.log("💥 Error at DB connection 💥", uri, options, error);
  }
};

module.exports = connectToDb;
