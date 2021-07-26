const mongoose = require('mongoose');
const { userName, password } = require('./config');


const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${userName}:${password}@mern-learnit.ibvoc.mongodb.net/mern-learnit?retryWrites=true&w=majority`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB is succefully connected!");
  } catch (error) {
    console.log("error: ", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
