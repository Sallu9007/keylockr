import './App.css';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './components/Landing Page/Dashboard';
import Register from './components/Signup/Register';
import Login from './components/Signup/Login';
import HomePage from './components/Home Page/HomePage';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element = {<Dashboard/>} />
      <Route path='/register' element = {<Register/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/home' element = {<HomePage/>} />
    </Routes>
    </>
  );
}

export default App;
