const app = require('./app');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;
const { HOST_URI } = process.env;
const PORT = process.env.PORT || 8081;

const connectMongo = async () => {
  mongoose
    .connect(HOST_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      app.listen(PORT, err => {
        if (err) {
          console.log('Error ', err);
        }
        console.log(`Server is running. Use our API on port: ${PORT}`);
      });
      console.log('Database connection successful');
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
};

const start = async () => {
  await connectMongo();
};
start();

// const { HOST_URI } = process.env;

// async function main() {
//   console.log(HOST_URI);
//   try {
//     await mongoose.connect(HOST_URI);
//     console.log('Connected to mongodb');
//   } catch (error) {
//     console.error('error while connection to mongodb', error.message);
//     process.exit(1);
//   }
// }
// main();
