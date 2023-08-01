import { useEffect, useState } from 'react';
import axios from 'axios';
function DaytoDay(props) {
    const [expense, setExpense] = useState([{}]);
    const fetchUserData = async() => {
        
        const data = await axios.get('http://localhost:8080/expense/daily/'+props.email);
        setExpense(data.data);
        
      }
    useEffect(() => {
       fetchUserData();
    },[]);

    return (
        <table className="table table-striped justify-content-center">
            <thead>
                <tr>
                    <th scope="col">S.N</th>
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope='col'>Amount</th>
                </tr>
            </thead>
            <tbody>
                {expense.map((exp,idx)=>{
                    return(
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>{exp.d}</td>
                            <td>{exp.name}</td>
                            <td>{exp.amount}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
export default DaytoDay;