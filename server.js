const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
app.use(express.static(__dirname + '/app-frontend'));

const PORT=process.env.PORT || 5000;
app.use(express.static('public'));
app.use(express.json());

const connectDB = require('./config/db');
connectDB();
//cors
app.use(cors());

//template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
// Routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));
app.listen(PORT,() =>{
    console.log(`Listening on port ${PORT}`);
})
