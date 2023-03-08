const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.set('strictQuery', true);

// const { HOST_URI } = process.env;
const PORT = process.env.PORT || 8081;

async function main() {
  try {
    await mongoose.connect(
      'mongodb+srv://admin:1qy8t44qN04n7Pzt@cluster0.pihsrlv.mongodb.net/?retryWrites=true&w=majority'
    );
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
