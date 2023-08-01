const con = require('../models/database');
let db = con.conn;

function forgot(req,res){
   db.connect((err)=>{
    if(err){
        return res.status(500).json({
            status:500,
            message:'internal server error'
        })
    }
    const sql = 'select * from users where email = ?'
    db.query(sql,[req.body.email],(err,result)=>{
        if(err){
        return res.status(500).json({
            status:500,
            message:'internal server error'
        })}
        if(result.length>0){
           return res.status(201).json({
            status:'201',
            message:'user exist'
           })
        }else{
            return res.status(404).json({
                message:'user not fount'
            })
        }
    })
   })
}
module.exports = {forgot};