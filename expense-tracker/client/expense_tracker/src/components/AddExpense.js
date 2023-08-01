import { useState } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
function AddExpense(props) {
    
    const email = props.email;
    const [expense, setExpense] = useState({ name: '', amount: '',email:email});
    const handleInput = async (e) => {
        e.preventDefault();
        const message = await axios.post('http://localhost:8080/expense',expense);
        alert(message.data.message);
       
    }
    return (<form onSubmit={handleInput}>
        <div className='row'>
            <div className='col-sm'>
                <label for='name'>Name</label>
                <input
                    required='required'
                    type='text'
                    className='form-control'
                    id='name'
                    name='name'
                    value={expense.name || ''}
                    onChange={(e)=>{setExpense({...expense,name:e.target.value})}}
                ></input>
            </div>
            <div className='col-sm'>
                <label for='amount'>Amount</label>
                <input
                    required='required'
                    type='number'
                    className='form-control'
                    id='amount'
                    value={expense.amount || ''}
                    name='amount'
                    onChange={(e)=>{setExpense({...expense,amount:e.target.value})}}
                ></input>
            </div>

        </div>
        <div className='row'>
            <div className='col-sm'>
                <button type='submit' className='btn btn-primary mt-3'>
                    Add Expense
                </button>
            </div>
        </div>
    </form>
    );
}
export default AddExpense;