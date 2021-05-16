const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;

//mongodb+srv://mmcginley:Yougotthis21@cluster1.mkzfu.mongodb.net/googlebooks?retryWrites=true&w=majority
