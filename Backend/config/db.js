const mongoose = require("mongoose");
const connDb = async () => {
  try {
    mongoose.connect(process.env.DB_URL);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose connection closed on app termination");
  process.exit(0);
});
module.exports = connDb;
