const express=require('express');
const app=express();
const port=3000;
const cors=require('cors');
require('dotenv').config();
const Razorpay=require('razorpay');

const razorpay=new Razorpay({
    key_id:process.env.Key_Id,
    key_secret:process.env.Secret
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.get('/',(req,res)=>{
    res.send('Hello World!');
});

app.post('/create-order',async(req,res)=>{
    const options={
        amount:500,
        currency:'INR',
        receipt:'receipt#1'
    };
    try{
        const order=await razorpay.orders.create(options);
        res.json(order);
    }catch(err){
        console.log(err);
        res.status(500).send('Error creating order');
    }
});



app.post('/verify-payment',(req,res)=>{
    const secret=process.env.Secret;
    const crypto=require('crypto');
    const shasum=crypto.createHmac('sha256',secret);
    shasum.update(req.body.razorpay_order_id+'|'+req.body.razorpay_payment_id);
    const digest=shasum.digest('hex');
    if(digest===req.body.razorpay_signature){
        res.json({status:'success'});
    }else{
        res.json({status:'failure'});
    }
});



app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});