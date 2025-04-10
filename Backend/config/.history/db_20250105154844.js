const mongoose = require("mongoose");
const connDb = async () => {
  try {
    mongoose.connect(
      "mongodb://zemar-saad:Zemar.saad10@192.168.1.37:27017/Bacharaty?authSource:admin"
    );
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
