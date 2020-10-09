const mongoose = require("mongoose");
const config = require("config");

// Get the mongo connection URL from the defaults.json file
const dbURL = config.get("mongoURL");

// Connect to mongoDB
module.exports = mongoose.connect(
  dbURL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => console.log("Connected to mongoDB")
);
