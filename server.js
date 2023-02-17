const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.set('strictQuery', true);

const { HOST_URI } = process.env;
const PORT = process.env.PORT || 8081;

async function main() {
  try {
    console.log('Database connected...........');
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
