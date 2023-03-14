const express = require("express");

const https = require("https");

const request = require("request");
const app = express();
var newdata = 'Hardwork is the key to success';
var auth = 'Unknown';
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("list",{
      newquote : newdata,
      authorname : auth
    })
});




app.post("/",(req,res)=>{
  request.get({
    url: 'https://api.api-ninjas.com/v1/quotes',
    headers: {
      'X-Api-Key': 'i8OPtxyjHnJ6YZ4DCwes9Q==yClcBBgzKCCFbwA8'
    },
  }, function(error, response, body) {
    if(error) return console.error('Request failed:', error);
    else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
    else{
         data = JSON.parse(body);
         newdata = data[0].quote;
         auth = data[0].author;
         res.redirect("/");
    }
  });
});
app.listen(4400,()=>{
    console.log("successfully running in port 4400");
});