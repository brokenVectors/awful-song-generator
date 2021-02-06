const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
app.use(express.static('client'));

app.get("/", (req,res) => {
  if(req.query.txt == undefined){
    res.sendFile(path.join(__dirname + '/client/create.html'));
  }
  else{
    res.sendFile(path.join(__dirname + '/client/song.html'));
  }
  
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})