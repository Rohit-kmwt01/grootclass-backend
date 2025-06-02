
express = require("express")

app = express()


// cors ========----------------================----------
cors = require("cors")
app.use(cors())

// bodyParser  ====================================

const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

// our schema ==========================================
let Userschema = require("./model/Users")


// mongodb ==============================================

const { default: mongoose } = require("mongoose")
mongoose.connect("mongodb://localhost:27017/grootclass").then((res)=>{
    console.log("mongodb connect")
}).catch((err)=>{
    console.log(err)
})


// signup api ================================
app.post("/signup", async(req,res)=>{
    // console.log(req.body)
   let userdata = await Userschema.insertOne({

        username : req.body.signupdata.username,
        email : req.body.signupdata.email,
        password : req.body.signupdata.password,
    })
    let result = await userdata.save()

    if(result){
        res.json({
            status:true,
            msg:"Successfully Signup"
        })

    }
    else{
        res.json({
            status:false,
            msg:"Failed to signup"
        })
    }
})

// allusers ==================================
app.get("/allusers",async (req,res)=>{
    let userdata = await Userschema.find({})
    // console.log(userdata)
      if(userdata){
        res.json({
            status:true,
            ourusers:userdata,
        })

    }
    else{
        res.json({
            status:false,
            
        })
    }
})

app.listen(5000,()=>{
    console.log("Server start at 5000")
})