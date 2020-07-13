require('./models/db');






const path = require('path');
const loController = require('./controllers/loController');
const bodyparser = require('body-parser');
const expressfileupload = require('express-fileupload');
const cors = require('cors');

const express = require('express');

var app = express();



app.use(cors({ credentials: true, origin: true }));

app.use(expressfileupload({
    createParentPath: true
}));

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());


app.use(express.static(path.join(__dirname + '/publics')));

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`I am listening at ${port} ....`);
});

app.use('/api', loController);