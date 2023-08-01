import Home from './components/Home';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Login from './components/Login';
function App() {
  return (
    <div>
       <BrowserRouter>
           <Layout></Layout>
       </BrowserRouter>
       
    </div>
   
  );
}

export default App;
