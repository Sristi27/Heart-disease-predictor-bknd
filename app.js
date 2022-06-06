const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path'); 
dotenv.config();

mongoose.connect( process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("Database connected");
    } else {
      console.log(err);
    }
  }
); 

const app = express();
app.use(bodyparser.urlencoded({extended:false}))
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

require("./models/User")
require('./models/Checkup');

app.use(require('./routes/Login'));
app.use(require('./routes/medicalInput'));


app.listen(5000, () => {
  console.log(
    `Server is ready at http://localhost:5000`
  );
});