const Razorpay = require('razorpay');
const { RAZOR_KEY_ID, RAZOR_SECRET_KEY } = process.env;
const crypto = require('crypto');
let con = require('../models/database');
let db = con.conn;
async function payment(req, res) {
    try {
        const { email } = req.body;
        db.connect((err) => {
            if (err) {
                res.status(500).send({
                    message: 'internal server error'
                })
            }
            const sql = 'select * from users where email=?';
            db.query(sql, [email], async (err, result) => {
                if (err) {
                    res.status(500).send({
                        status:'500',
                        message: 'internal server error'
                    })
                }
                if (result.length === 0) {
                    res.status(404).send({
                        status:'404',
                        message: 'user not found'
                    })
                } else {
                    let instance = new Razorpay({
                        key_id: RAZOR_KEY_ID,
                        key_secret: RAZOR_SECRET_KEY
                    })
                    let order = await instance.orders.create({
                        amount: req.body.amount * 100,
                        currency: "INR",
                        receipt: "order_rcptid_11"
                    });
                    if (!order) {
                        return res.json({
                            status:'500',
                            message: 'internal server error'
                        })
                    }
                    console.log('hello');
                    res.status(201).json({
                        status:'201',
                        order: order
                    });
                }
            })
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            status:'500',
            message: 'internal server error'
        })
    }
}
async function paymentCapture(req, res) {
    console.log(req.body);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", RAZOR_SECRET_KEY)
        .update(sign.toString()).digest("hex");
    if (expectedSign === razorpay_signature) {
        console.log('verified');
        const email = req.params.email;
        db.connect((err)=>{
            if(err){
                res.status(500).json({
                    message:'internal server error'
                })
            }
            const sql = 'update users set isPremium=? where email=?';
            db.query(sql,[true,email],(err,result)=>{
                if(err){
                    res.status(500).json({
                        message:'internal server error'
                    })
                }
                res.status(201).json({
                    message:'user take premium'
                })
            })
        })
        
    } else {
        res.status(400).send('Invalid signature');
    }
}
async function refund(req, res) {
    try {
        //first validate the payment Id then call razorpay API
        const options = {
            payment_id: req.body.paymentId,
            amount: req.body.amount,
        };
        const razorpayResponse = await razorpay.refund(options);
        //we can store detail in db and send the response
        res.send('Successfully refunded')
    } catch (error) {
        console.log(error);
        res.status(400).send('Unable to refund the payment');
    }
}
module.exports = { payment, paymentCapture };
