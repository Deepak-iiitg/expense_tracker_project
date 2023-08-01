import { useEffect, useState } from 'react';
import axios from 'axios';
function Leaderboard() {
    const [expense, setExpense] = useState([{}]);
    const fetchUserData = () => {
        fetch("http://localhost:8080/expense/leaderboard")
          .then(response => {
            return response.json()
          })
          .then(data => {
            setExpense(data)
          })
      }
    useEffect(() => {
       fetchUserData();
    }, []);
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope='col'>Total Amount</th>
                </tr>
            </thead>
            <tbody>
                {expense.map((exp,idx)=>{
                    return(
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>{exp.name}</td>
                            <td>{exp.email}</td>
                            <td>{exp.amount}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
export default Leaderboard;