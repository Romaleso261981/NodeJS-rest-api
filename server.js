const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const dotenv = require('dotenv');
dotenv.config();

const { HOST_URI } = process.env;

async function main() {
  console.log(HOST_URI);
  try {
    await mongoose.connect(HOST_URI);
    console.log('Connected to mongodb');
  } catch (error) {
    console.error('error while connection to mongodb', error.message);
    process.exit(1);
  }
}
main();
