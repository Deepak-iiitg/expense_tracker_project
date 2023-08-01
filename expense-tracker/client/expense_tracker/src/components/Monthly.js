import { useEffect, useState } from 'react';
import axios from 'axios';
function Monthly(props) {
    const [expense, setExpense] = useState([{}]);
    const fetchUserData = () => {
        fetch("http://localhost:8080/expense/monthly/"+props.email)
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
                    <th scope="col">S.N</th>
                    <th scope="col">Month</th>
                    <th scope="col">Total Amount</th>
                </tr>
            </thead>
            <tbody>
                {expense.map((exp,idx)=>{
                    return(
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>{exp.month}</td>
                            <td>{exp.amount}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
export default Monthly;