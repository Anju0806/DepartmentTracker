const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
console.log(process.env.DB_HOST);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(deptrouter);


app.listen(PORT, function(){
  console.log('running on http://localhost:' + PORT);
})
 
