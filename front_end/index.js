const express=require("express");
const { METHODS } = require("http");
const port=3000;
const cors=require('cors');
const path=require('path');
const app=express();
app.use(cors());
const url="http://127.0.0.1:5000/predict";
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const data=["step","type","amount","oldbalanceOrg","newbalanceOrig","oldbalanceDest","newbalanceDest"];
app.get("/",(req,res)=>{
    res.render('index.ejs',{data});
});

app.post("/submit",async(req,res)=>{
    const ob= req.body;
    const obj={};
    for ([key,value] of Object.entries(ob)){
        if(key!=="type")obj[String(key)]=Number(value);
        else obj[String(key)]=value;
    }
    console.log(obj);
    let re=-1;
    await fetch(url,{
        method:"post",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(obj),
    }).then(async (r)=>{
        console.log(r);
        // const x=r.body;
        return await r.json();
    }).then((d)=>{
        console.log(d);
        re=Number(d["prediction"]);
        console.log(re);
    }).catch((err)=>{
        console.log(err);
    })
    res.render('predict.ejs',{re});
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})