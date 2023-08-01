const con = require('../models/database');
const bcrypt = require('bcrypt');
const db = con.conn;
async function resetPassword(req,res){
    
    const password = await bcrypt.hash(req.body.pass, 10);
    const email = req.body.email;
    
    db.connect((err)=>{
        if(err){
            return res.status(500).json({
                message:'internal server error'
            })
        }
       
            const sql = 'update users set password=? where email=?';
            const values = [password,email];
            db.query(sql,values,(err)=>{
                if(err){
                    return res.status(500).json({
                        message:'internal server error'
                    })
                }
                return res.status(201).json({
                    message:'password update successfully'
                })
            })
      
    })
}
module.exports = {resetPassword};