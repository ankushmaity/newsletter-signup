const express=require("express")
const bodyParser=require("body-parser")
const request=require("request")
const https=require("https")
const app= express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
var firstName=req.body.fname
var lastName=req.body.lname
var email=req.body.email
const data = {
    members: [
        {
          email_address: email,
          status: 'subscribed',
          merge_fields: {
              FNAME: firstName,
              LNAME: lastName
          }
        }
      ]
}
 const jsonData = JSON.stringify(data);
 const url = "https://us17.api.mailchimp.com/3.0/lists/8bba20f9c6";

   const options = {
       method: "POST",
       auth: "text or name:8a2a7a237cfbb55ae0d22f42c60b3adf-us17"
   };

   const request = https.request(url, options, function(response){
     if(response.statusCode===200)res.sendFile(__dirname+"/success.html")
     else res.sendFile(__dirname+"/failure.html")
       response.on("data", function(data){
           console.log(JSON.parse(data));
       });
   });

   request.write(jsonData);
   request.end();


})
app.post("/failure", function(req, res){
    res.redirect("/")
});
app.post("/success", function(req, res){
    res.redirect("/")
});
app.listen(process.env.PORT || 3000,function(){
  console.log("hey");
})
//8a2a7a237cfbb55ae0d22f42c60b3adf-us17
