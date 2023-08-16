import './App.css'
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import IndexPage from './pages/IndexPage.jsx'
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import {UserContextProvider} from './userContext';
import { useEffect } from 'react'; 
import AccountPage from './pages/AccountPage';

axios.defaults.baseURL = 'http://127.0.0.1:4012';
axios.defaults.withCredentials = true; // Add this line

// credentials


function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route exact path='/' element={<Layout/>}>
      <Route exact path='/' element={<IndexPage />} />
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/register' element={<RegisterPage />} />
        <Route path='/account/:subpage?' element={<AccountPage />}></Route>
        <Route path='/account/:subpage/:action' element={<AccountPage />}></Route>
       
      </Route>
    </Routes>
   
    </UserContextProvider>
  )
}

export default App
