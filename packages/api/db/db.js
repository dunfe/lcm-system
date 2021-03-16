import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from 'express';
const app = express();

export const connectDB = (resolve, reject) => {
        if (process.env.NODE_ENV === 'test') {
            console.log('Connecting to a mock db for testing purposes.');
        
            const mongoServer = new MongoMemoryServer();
          
            mongoose.Promise = Promise;
            mongoServer.getUri()
                .then((mongoUri) => {
                    const mongooseOpts = {
                        useNewUrlParser: true,
                        useCreateIndex: true,
                        useUnifiedTopology: true
                    };
          
                    mongoose.connect(mongoUri, mongooseOpts);
          
                    mongoose.connection.on('error', (e) => {
                        if (e.message.code === 'ETIMEDOUT') {
                            console.log(e);
                            mongoose.connect(mongoUri, mongooseOpts);
                        }
                        console.log(e);
                    });
          
                    mongoose.connection.once('open', () => {
                        console.log(`MongoDB successfully connected to ${mongoUri}`);
                    });
                });
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