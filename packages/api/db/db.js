import mongoose from 'mongoose';
import express from 'express';
const app = express();

export const connectDB = (resolve, reject) => {
        if (process.env.NODE_ENV === 'test') {
            console.log('Connecting to a mock db for testing purposes.');


            mongoose.Promise = Promise;
          } else {
            mongoose.connect(process.env.MONGODB_URI,{
              useFindAndModify: false,
              useNewUrlParser: true,
              useUnifiedTopology: true,
            }).then(() => {
                console.log('Connected to mongoDB');
                return app.listen(3000);
              })
              .then(() => console.log('server running on port 3000'))
              .catch(err => console.log(err.message));
          }
  }

export default connectDB;
