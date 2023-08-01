let isLoged = require('./Auth');
let flag = isLoged.flag;
const con = require('../models/database');
let db = con.conn;
function AddExpense(req, res) {
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'november', 'december'];
    let date = new Date();
    let d = date.toJSON().slice(0, 10);
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let email = req.body.email;
    let name = req.body.name;
    let amount = parseInt(req.body.amount);
    // console.log(amount);
    db.connect((err) => {
        if (err) {
            return res.send({
                message: 'error'
            })
        }
        const sql = 'insert into expense(adding_date,email,expense_name,amount,month,year) values ?';
        const values = [d, email, name, amount, month, year];
        db.query(sql, [[values]], (err, result) => {
            if (err) {
                return res.send({
                    message: 'error'
                })
            }
            return res.send({
                message: 'expense add successfully'
            })

        });
    })
}
function getYearlyExpense(req, res) {
    console.log(req.params.email);
    db.connect((err) => {
        if (err) {
            return res.status(500).send({
                message: 'internal server error'
            })
        }
        const sql = 'select year,sum(amount) as amount from expense where email=? group by year';
        db.query(sql, [req.params.email], (err, result) => {
            if(err){
                return res.status(500).send({
                    message: 'internal server error'
                })
            }
            return res.status(200).send(result);
        })

        
    })
}


function getMonthlyExpense(req, res) {
    db.connect((err) => {
        if (err) {
            return res.send([])
        }
        const sql = 'select month,sum(amount) as amount from expense where email=? group by month';
        db.query(sql, [req.params.email], (err, result) => {
            if (err) {
                return res.send([])
            }

            return res.send(result);
        })
    })

}

function getDailyExpense(req, res) {
    db.connect((err) => {
        if (err) {
            return res.send([])
        }
        const sql = 'select adding_date as d,expense_name as name,amount from expense where email=?';
        db.query(sql, [req.params.email], (err, result) => {
            if (err) {
                return res.send([])
            }
            console.log(result);
            return res.send(result);
        })
    })

}
function leaderboard(req, res) {
    //console.log(req.cookies);
    //console.log('leader');
    db.connect((err) => {
        if (err) {
            return res.send([])
        }
        const sql = 'select u.name as name,e.email as email,sum(e.amount) as amount from expense as e inner join users as u on e.email=u.email group by e.email order by amount desc';
        db.query(sql, (err, result) => {
            if (err) {
                return res.send([]);
            }
            //console.log(result);
            return res.send(result);
        })
    })
}
function getCooki(req, res, next) {
    console.log(req.cookies);
    if (req.cookies.isLoged) {
        next();
    } else {
        console.log(req.cookies.isLoged);
        return res.send({
            message: 'not allowed'
        });
    }
}

module.exports = {
    AddExpense, getYearlyExpense, getMonthlyExpense,
    getDailyExpense, leaderboard, getCooki
};