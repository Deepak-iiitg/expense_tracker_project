let con = require('../models/database');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;
let conn = con.conn;
let flag = false;
async function login(req, res) {
    try {
        
        conn.connect((err) => {
            if (err) {
                return res.send({
                    message: 'something went wrong'
                })
            }
            const sql = 'select * from users where email=?';
            conn.query(sql, [req.body.email], async (err, result) => {
                if (err) {
                    return res.status(401).send({
                        status:'401',
                        message: 'something went wrong'
                    })
                }
                if (result.length > 0) {
                    const comPass = await bcrypt.compare(req.body.password, result[0].password);
                    
                    if (comPass) {
                        let email = req.body.email;
                        let token = jwt.sign({payload:email},SECRET_KEY);
                        res.cookie('login',token);                      
                        return res.status(200).send({
                            name: result[0].name,
                            email: result[0].email
                        })
                    } else {
                        return res.status(404).send({
                            message: 'wrong user id or password'
                        })
                    }
                } else {
                    return res.status(404).send({
                        message: 'wrong user id or password'
                    })
                }
            })
        })

    } catch (e) {
        res.status(500).send({
            message: 'Internal server error'
        })
    }


}
async function register(req, res) {
    const password = await bcrypt.hash(req.body.password, 10);
    console.log(req.body);
    const data = req.body;
    conn.connect((err) => {
        if (err) {
            res.status(500).send({
                message: 'Interval serever error'
            })
        }
        let sql = 'select * from users where email=?';
        conn.query(sql, [data.email], (err, result) => {
            if (err) {
                return res.status(500).send({
                    message: 'Internal server error'
                })
            }
            if (result.length > 0) {
                return res.status(201).send({
                    message: 'user already exits'
                });
            } else {
                sql = 'insert into users(name,email,password) values ?';
                const values = [req.body.name, req.body.email, password];
                conn.query(sql, [[values]], (err) => {
                    if (err) {
                       
                        return res.status(500).send({
                            message: 'Internal server error'
                        })
                    } else {
                        const token = jwt.sign({email:req.body.email},SECRET_KEY);
                        return res.status(201).send({
                            message: 'user successfully registered',
                            token:token
                        })
                    }
                })
            }
        })
        // if not exits then add in database

    })
}
function protectRouting(req,res,next){
    console.log(req.cookies);
    if(req.cookies.login){
        let isVerified = jwt.verify(req.cookies.login,SECRET_KEY);
        if(isVerified){
            next();
        }
        
    }else{
        return res.send([])
    }
}
function logout(req,res){
    console.log(req.cookies);
     return res.send({
        message:'user logout'
     })
}
module.exports = {logout,login, register,protectRouting,cookieParser};