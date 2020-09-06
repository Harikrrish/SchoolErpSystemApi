const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const routes = require("./app/routes/route");
const cors = require('cors');


mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('/', routes);

// app.get('/', (req, res) => {
//     res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
// });

// app.get('/users/:userId', [
//     UsersController.getById
// ]);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is listening on port 5000");
});