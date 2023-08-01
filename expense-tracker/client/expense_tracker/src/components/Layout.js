import {Routes,Route} from 'react-router';
import Login from './Login';
import Dashboard from './Dashboard';
import Forgot from './ForgotPassword';
import Premium from './Premium';
import Reset from './ResetPassword.js';
function Layout(){
    return(
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/forgot' element={<Forgot/>}></Route>
            <Route path='/premium' element={<Premium />}></Route>
            <Route path='/reset' element={<Reset/>}></Route>
        </Routes>
    )

}
export default Layout;