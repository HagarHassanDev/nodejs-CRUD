const mongoose = require('mongoose');


mongoose.connect(
    // 'mongodb://41.0.8.127:27017/LOManager'  
    // process.env.MONGODB_URL
    'mongodb://localhost:27017/LOManager', { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
        if (!error) console.log('mongoose connection success');
        else console.log("error with mongo connnect" + error);
    });

require('./lo.model');