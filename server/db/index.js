// const Monk = require('monk')
// const mongoConnect = Monk('localhost/mydb')
// // const DB_URL = 'mongodb://localhost:27017/TodoList';
// export const connectDB = (tableName) => {
//     return mongoConnect.collection(tableName)
// }

import mongoose from 'mongoose';
const DB_URL = 'mongodb://localhost:27017/mydb';
export default  () => {
  const connect = () => {
    // mongoose.Promise = require('bluebird');
    mongoose.connect(DB_URL, err => {
      if (err) {
        console.log(`===>  Error connecting Reason: ${err} `);
      } else {
        console.log(`===>  Succeeded in connecting to mongoDB`);
      }
    });
  };
  connect();

  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connect);

};
