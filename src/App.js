import './App.css';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './components/Landing Page/Dashboard';
import Register from './components/Signup/Register';
import Login from './components/Signup/Login';
import HomePage from './components/Home Page/HomePage';
import GeneratePass from './components/generatePassword/GeneratePass';
import Error from './components/Error/error';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element = {<Dashboard/>} />
      <Route path='/register' element = {<Register/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/home' element = {<HomePage/>} />
      <Route path='/generatepass' element = {<GeneratePass/>} />
      <Route path='*' element = {<Error/>} />
    </Routes>
    </>
  );
}

export default App;
