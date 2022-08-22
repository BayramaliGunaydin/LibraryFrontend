import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes , Route,Navigate} from "react-router-dom"
import Home from "../src/components/Home/Home"
import User from "../src/components/user/User"
import Navbar from "../src/components/Navbar/Navbar";
import SingleUser from './components/user/SingleUser';
import Login from '../src/components/Auth/Login'
import Register from "../src/components/Auth/Register"
import Image from "../src/components/Image"
import Profile from "../src/components/user/Profile"
import Userlist from './components/Admin/Userlist';
import Userlistfetch from "../src/components/Admin/Userlistfetch"
import Addbook from "../src/components/Admin/Addbook"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
       <Route exact path ="/" element={<Home/>}></Route>
       <Route exact path ="/user/:userid" element={<Profile/>}></Route>
       <Route exact path ="/linkuser/:userid" element={<SingleUser/>}></Route>
       <Route exact path ="/userlist" element={<Userlistfetch/>}></Route>
       <Route exact path ="/addbook" element={<Addbook/>}></Route>
       <Route exact path="/login"
          element={<Login/>}>
          </Route>
          <Route exact path="/register"
          element={<Register/>}>
          </Route>
          <Route exact path ="/image" element={<Image/>}></Route>
      </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
