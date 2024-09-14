const mongoose = require("mongoose");
require("dotenv").config({});
const dbconnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database Connected Succesfully");
    })
    .catch((err) => {
      console.log(`Database faces some    issues ${err}`);
    });
};

module.exports = { dbconnection };
