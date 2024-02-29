var express=require('express');
var bodyParser=require('body-parser')
var mongoose=require('mongoose')

const app=express()
app.use(bodyParser.json())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect('mongodb+srv://ps951854:RcUQUS3i9zB0W0r8@cluster0.tuotgqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
var db=mongoose.connection
db.on('error',()=>console.log("Error in connecting to database"))
db.once('open',()=>console.log("connected to database"))

app.post("/sign_up",(req,res)=>{
    var name=req.body.name
    var age=req.body.age
    var email=req.body.email
    var phono=req.body.phono
    var gender=req.body.gender
    var password=req.body.password

    var data={
        "name":name,
        "age":age,
        "email":email,
        "phono":phono,
        "gender":gender,
        "password":password
    }

    db.collection('user').insertOne(data,(err,collection)=>{
        if(err){
            throw err
        }
        console.log("Record inserted Sucesfully")
    })
    return res.redirect('signup_successfull.html')
})


app.get('/',(req,res)=>{

    res.set({
        "Allow -access-Allow-Origin":"*"
    })
    return redirect("index.html")

}).listen(2000);

console.log('listen on port 2000')