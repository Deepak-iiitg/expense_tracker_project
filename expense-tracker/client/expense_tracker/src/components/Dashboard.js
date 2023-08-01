import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import './style.css';

import Body from './Body';
function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [compFlag, setCompFlag] = useState('add');
    //const [flag,setFlag] = useState('true');
    let email = location.state.email;
    useEffect(() => {
        console.log('change');
    }, [compFlag]);
    const changeRender = (x) => {

        if (x === 1) {
           setCompFlag('add')
        } else if (x === 2) {
            setCompFlag('daily');
        } else if (x === 3) {
            setCompFlag('monthly');
        } else if (x === 4) {
            setCompFlag('yearly');
        } else if(x===5){
          setCompFlag('leaderboard');
        }
        //console.log(compFla
    }
    const handleLogout = async () => {
        const message = await axios.get('http://localhost:8080/auth/logout');
        alert(message.data.message);
        navigate('/');
    }
    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">ExpenseTracker</span>
                    <div>
                        <span><button style={{ border: "0px" }}
                        ><Link style={{ textDecoration: 'none' }} to='/premium'>premium
                            </Link></button></span>
                        <span><button style={{ border: "0px" }}
                            onClick={handleLogout}><Link style={{ textDecoration: 'none' }} to='/'>logout
                            </Link></button></span>
                    </div>
                </div>
            </nav>
            <div className="conatiner-fluid">
                <h3>Welcome {location.state.name} </h3>
                <div className="body">
                    <div className="left-body">
                        <ul>
                        <li><button className="btn btn-primary"
                            onClick={() => {
                                changeRender(1)
                            }}>Add Expense</button></li>
                        <li><button className="btn btn-primary"
                            onClick={() => {
                                changeRender(2)
                            }}>DayToDay</button></li>
                        <li><button className="btn btn-primary"
                            onClick={() => {
                                changeRender(3)
                            }}>Monthly</button></li>
                        <li><button className="btn btn-primary"
                            onClick={() => {
                                changeRender(4)
                            }}>Yearly</button></li>
                        <li><button className="btn btn-primary"
                            onClick={() => {
                                changeRender(5)
                            }}>Leaderboard</button></li>
                        </ul>

                    </div>
                    <div className="right-body">
                         <Body email={email} render={compFlag} />
                    </div>
                </div>
                {/* <div className="container justify-content-center">
                    <AddExpense email={email} fun={changeRender} />


                    <Body email={email} render={compFlag} />
                    {/* <Yearly email={email}/>
               <Monthly email={email}/>
               <DaytoDay email={email}/>
               <Leaderboard /> */}
                
            </div>


        </div>
    )
}
export default Dashboard;