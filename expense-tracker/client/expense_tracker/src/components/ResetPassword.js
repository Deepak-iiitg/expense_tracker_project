import {useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

function Reset(){
    const navigate = useNavigate();
    const [password,setPassword] = useState({password:'',confirmPassword:''});
    const location = useLocation();
    const email = location.state.em;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const obj = {pass:password.confirmPassword,email};
        if(password.password !== password.confirmPassword){
            alert('password and confirm password miss match');
        }else{
            const message = await axios.post('http://localhost:8080/resetpassword',obj);
            if(message.status === 201){
                alert('password successfully reset');
                navigate('/');
                
            }else{
                alert(message.data.message);
            }
        }
       
    }
    return (
        <section className="container p-4 mt-5" style={{maxWidth:"500px"}}>
        <h4 className="text-center mb-4">ENTER NEW PASSWORD</h4>
        <form onSubmit={handleSubmit} style={{maxWidth:"500px"}}>
            <div className="mb-3">
                <label className="form-label">New password</label>
                <input type="password" name="pass" 
                className="form-control" 
                placeholder="*****"
                onChange={(e)=>{setPassword({...password,password:e.target.value})}}
                value={password.password}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Re-enter password</label>
                <input type="password" name="conpass"
                 className="form-control" placeholder="*****"
                 onChange={(e)=>{
                    setPassword({...password,confirmPassword:e.target.value})
                 }}
                 value={password.confirmPassword || ''}/>

            </div>
            <div className="mb-3">
                <button type="submit" className="btn btn-success">Reset</button>
            </div>
        </form>
    </section>
    );
}
export default Reset;