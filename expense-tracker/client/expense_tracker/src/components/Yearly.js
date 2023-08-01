import { useEffect, useState } from 'react';
import axios from 'axios';
function Year(props) {
    console.log(props.email);
    const [expense, setExpense] = useState([{}]);
    const fetchUserData = async () => {
        const data = await axios.get('http://localhost:8080/expense/yearly/'+props.email,{
            withCredentials:true
        })
        if(data.status === 500){
            alert(data.data.message);
        }else{
            setExpense(data.data);
        }
        
      }
    useEffect(() => {
       fetchUserData();
    }, []);
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">S.N</th>
                    <th scope="col">Year</th>
                    <th scope="col">Total Amount</th>
                </tr>
            </thead>
            <tbody>
                {expense.map((exp,idx)=>{
                    return(
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>{exp.year}</td>
                            <td>{exp.amount}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
export default Year;