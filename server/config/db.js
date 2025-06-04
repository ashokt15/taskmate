const mongoose = require('mongoose');

/**
 * Establishes a connection to the MongoDB database.
 * The connection URI is fetched from environment variables.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from process.env.MONGO_URI
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log any errors that occur during connection
    console.error(`Error: ${error.message}`);
    // Exit the process with a failure code
    process.exit(1);
  }
};

module.exports = connectDB;