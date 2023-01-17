const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
mongoose.set('debug', true);
mongoose.set('strictQuery', true);

const { HOST_URI } = process.env;
const PORT = process.env.PORT || 8081;

async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log('Database connection successful');
    app.listen(PORT, err => {
      if (err) {
        console.log('Error ', err);
      }
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  } catch (error) {}
}
main();

// const connectMongo = async () => {
//   mongoose
//     .connect(HOST_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       app.listen(PORT, err => {
//         if (err) {
//           console.log('Error ', err);
//         }
//         console.log(`Server is running. Use our API on port: ${PORT}`);
//       });
//       console.log('Database connection successful');
//     })
//     .catch(err => {
//       console.error(err);
//       process.exit(1);
//     });
// };

// const start = async () => {
//   await connectMongo();
// };
// start();
