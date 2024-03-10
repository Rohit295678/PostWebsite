import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Signup = () => {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleCheckboxChange = () => {
    setAgreedToTerms(!agreedToTerms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!agreedToTerms) {
        setError("Please agree to the terms and conditions");
        setTimeout(() => {
          setError("");
        }, 1000);
        return;
      }
      if (data.password !== data.confirmPassword) {
        setError("Password doesn't match");
        setTimeout(() => {
          setError("");
        }, 1000);
        return;
      }
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
      setData({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setAgreedToTerms(!agreedToTerms);
      setTimeout(() => {
        setMsg("");
      }, 1000);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full mx-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row">
          <div className="p-8 bg-green-500 text-white md:w-1/2 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-4 text-center">
              Welcome Back
            </h1>
            <Link
              to="/login"
              className="bg-white text-green-500 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100"
            >
              Sign in
            </Link>
          </div>

          <div className="p-8 md:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h1 className="text-3xl font-bold mb-4">Create Account</h1>
              <input
                type="text"
                placeholder="UserName"
                name="userName"
                onChange={handleChange}
                value={data.userName}
                required
                className="px-4 py-3 rounded-lg bg-gray-200 w-full border-none outline-none mt-5 font-semibold"
              />
              <input
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
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="termsCheckbox"
                  onChange={handleCheckboxChange}
                  checked={agreedToTerms}
                  className="mr-2"
                />
                <label
                  htmlFor="termsCheckbox"
                  className="text-sm text-gray-600"
                >
                  I agree to the <Link to='#' className="text-blue-700 font-semibold">Terms and conditions</Link>
                </label>
              </div>
              {error && (
                <div className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  {error}
                </div>
              )}
              {msg && (
                <div className="bg-green-500 text-white px-4 py-2 rounded-lg">
                  {msg}
                </div>
              )}
              <button
                type="submit"
                className={`px-4 py-2 bg-green-500 text-white rounded-lg font-semibold ${
                  agreedToTerms ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!agreedToTerms}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
