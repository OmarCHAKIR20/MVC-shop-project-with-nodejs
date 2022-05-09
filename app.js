const express = require("express");
const bodyParser = require("body-parser");



const path = require("path");
const app = express();
const mongoConnect = require('./util/database').MongoClient;     
const User = require('./models/user')   

const adminRoute = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
//const errorController = require("./controllers/error");




app.use(bodyParser.urlencoded({ extended: false })); //parse the body to a readable format
app.use(express.static(path.join(__dirname , 'public'))); //make css files visible to the public


app.set('view engine','ejs');// we tell node that we want to compile dynamic  templates
app.set('views','views'); //where to find these templates      

app.use((req ,res , next)=>{
    User.findById('6005d83973f3d1daa5020fa0')
   .then(user=>{
        req.user = new User(user.name , user.email , user.cart , user._id);
        next();
    }).catch(err=>{
        console.log(err)
    })
 
});

//filter by admin
app.use('/admin',adminRoute); // the order doesnt matter ps: we should use in the routes get,post....
app.use(shopRoutes); 
//app.use(errorController.get404);




mongoConnect(()=>{
    app.listen(3000);
})


