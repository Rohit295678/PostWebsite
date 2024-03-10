import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");
	const [forgotPass,setForgotPass] = useState(false);
	const [emailForgot,setEmailForgot] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setTimeout(() => {
					setError("");
				}, 1500);
			}
		}
	};

	const forgotPassword = async()=>{
        try {
			const url = "http://localhost:8080/api/forgot";
			console.log(emailForgot)
			const {data: res} = await axios.post(url,{emailForgot})
			setMsg(res.message);
			
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			  ) {
				setError(error.response.data.message);
				setEmailForgot("")
				setTimeout(() => {
					setError("");
				  }, 1000);
			  }
		}
	}

	return (
		<div className="bg-gray-100 min-h-screen flex items-center justify-center">
    <div className="max-w-4xl w-full mx-4">
        <div className="bg-white rounded-lg overflow-hidden min-h-96 shadow-lg flex flex-col md:flex-row">
            <div className="p-8 flex-2 flex flex-col justify-center items-center bg-white rounded-l-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h1 className="text-3xl font-bold mb-8">Login to Your Account</h1>
                    {!forgotPass ?<div><input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                        required
                        className="px-4 py-3 rounded-lg bg-gray-200 w-full border-none outline-none mt-5 font-semibold"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={data.password}
                        required
                        className="px-4 py-3 rounded-lg bg-gray-200 w-full border-none outline-none mt-5 font-semibold"
                    /></div>:<div><p className="text-md font-medium">Enter your Email</p><input
					type="email"
					placeholder="Email"
					name="emailForgot"
					onChange={(e)=>setEmailForgot(e.target.value)}
					value={emailForgot}
					required
					className="px-4 py-3 rounded-lg bg-gray-200 w-full border-none outline-none mt-5 font-semibold"
				/></div>}
                    {error && <div className="px-4 py-2 bg-red-500 text-white rounded-lg">{error}</div>}
					{msg && (
                <div className="bg-green-500 text-white px-4 py-2 rounded-lg">
                  {msg}
                </div>
              )}
					{!forgotPass ?<div><p className="text-teal-500 text-xl font-semibold text-center cursor-pointer" onClick={()=>setForgotPass(true)}>Forgot Your Password?</p>
                    <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold">
                        Sign In
                    </button></div>:<div onClick={forgotPassword} className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold text-center cursor-pointer">
                        Verify User
                    </div>}
                </form>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-center items-center bg-teal-500 rounded-r-lg">
                <h1 className="text-3xl font-bold mb-8 text-white">New Here ?</h1>
                <Link to="/signup" className="px-4 py-2 bg-white text-teal-500 rounded-lg font-semibold">
                    Sign Up
                </Link>
            </div>
        </div>
    </div>
</div>

	);
};

export default Login;