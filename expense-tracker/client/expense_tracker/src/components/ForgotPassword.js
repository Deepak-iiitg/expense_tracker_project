import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Forgot(){
    const [email,setEmail] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const message = await axios.post('http://localhost:8080/forget',{email:email});
        if(message.status === 201){
            navigate('/reset',{state:{em:email}});
        }else{
            alert(message.data.message);
        }
    }
    return (
        <section className="container p-4 mt-5" style={{maxWidth:"500px"}}>
        <h4 className="text-center mb-4">RESET YOUR PASSWORD</h4>
        <form onSubmit = {handleSubmit} style={{maxWidth:"500px"}}>
            <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input type="email" name="email" className="form-control"
                value = {email || '' }placeholder="enter your email"
                onChange={(e)=>{setEmail(e.target.value)}}
                />
            </div>
            <div className="mb-3">
                <button type="submit" className="btn btn-primary">Send Reset Link</button>
            </div>
        </form>
      </section>
    );
}
export default Forgot;