import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = ()=>{
    const param = useParams();
    const [data, setData] = useState({
        password: "",
        confirmPassword: "",
      });
    const [msg,setMsg] = useState(false)
     const [error,setError] = useState(false)
      const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(data.password !== data.confirmPassword) {
                setError("Password not matched");
                return;
            }
            const url = `http://localhost:8080/api/forgot/${param.id}/reset/${param.token}`;
            const { data: response } = await axios.post(url, {
                password: data.password
            });
            console.log(response);
            setMsg("Password Updated Successfully")
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                setTimeout(() => {
                    setError("");
                  }, 1000);
            }
        }
    }
    
    return(
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
    <div className="max-w-4xl w-full mx-4">
        <div className="bg-white rounded-lg overflow-hidden min-h-96 shadow-lg flex flex-col md:flex-row">
            <div className="p-8 flex-2 flex flex-col justify-center items-center bg-white rounded-l-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h1 className="text-3xl font-bold mb-8">Reset Your PassWord</h1>
                    <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className="px-4 py-3 rounded-lg bg-gray-200 w-full border-none outline-none mt-5 font-semibold"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                value={data.confirmPassword}
                required
                className="px-4 py-3 rounded-lg bg-gray-200 w-full border-none outline-none mt-5 font-semibold"
              />
              {error && (
                <div className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  {error}
                </div>
              )}
              {msg && (
                <div className="bg-green-500 text-white px-4 py-2 rounded-lg m-20">
                  {msg}
                </div>
              )}
              {msg?<Link to='/login' className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold">Login</Link>:<button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold">Reset Password</button>}
                    </form>
                    </div>
                    <div className="p-8 flex-1 flex flex-col justify-center items-center bg-teal-500 rounded-r-lg">
                <div className="px-4 py-2 text-white text-2xl rounded-lg font-semibold">
                    Forgot Your Password
                </div>
            </div>
                    </div>
                    </div>
                    </div>
    )

}
export default ResetPassword