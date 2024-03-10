import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import ResetPassword from "./components/ResetPassword";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import { useState } from "react";
import SinglePost from "./components/SinglePost";

function App() {
	const user = localStorage.getItem("token");
    const [userDetail,setUserDetail] = useState({
		id:"",
		email:"",
		name:"",
	});

	const getUserDetails=(data)=>{
		setUserDetail({id: data._id,email:data.email,name:data.userName})
	}
	return (
		<>
		<Navbar getUserDetails={getUserDetails} />
		<Routes>
			{user && <Route path="/" exact element={<Main email={userDetail.email} />} />}
			{!user&&<><Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} /></>}
			<Route path="/signup" element={<Navigate replace to="/" />} />
			<Route path="/login" element={<Navigate replace to="/" />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path='/about' exact element={<AboutUs />} />
			<Route path='/contact' exact element={<ContactUs />} />
			<Route path='/singlepost/:id' exact element={<SinglePost />}/>
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/users/:id/reset/:token" element={<ResetPassword/>} />
		</Routes>
		</>
	);
}

export default App;