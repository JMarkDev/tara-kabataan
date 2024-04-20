import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Cookies from "js-cookie";
import { useToast } from "../../hooks/useToast";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import Loading from "../../components/loading/otpLoader/otpLoader";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const [values, setValues] = useState({
    email: "",
    password: "",
    // role: '',
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const userId = Cookies.get("userId");
  const role = Cookies.get("role");

  const handleLogin = async (event) => {
    setLoader(true);
    event.preventDefault();

    // Clear error messages when the user submits the form
    setEmailError("");
    setPasswordError("");
    setErrorMessage("");

    try {
      const response = await api.post("/auth/login", values, {
        headers: { "Content-Type": "application/json" },
        // withCredentials: true,
      });

      Cookies.set("token", response.data.token, { expires: 1 });
      Cookies.set("role", response.data.role, { expires: 1 });
      Cookies.set("userId", response.data.userId, { expires: 1 });

      if (response.data.status === "success") {
        toast.success("Login successfully");
        const userRole = response.data.role;
        const dashboardURL = userRole === "admin" ? "/dashboard" : "/home";

        navigate(dashboardURL);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (err) {
      setLoader(false);
      console.log(err.response);

      if (err.response.data.errors) {
        err.response.data.errors.forEach((error) => {
          if (error.path === "email") {
            setEmailError(error.msg);
          } else if (error.path === "password") {
            setPasswordError(error.msg);
          }
        });
      }
      setErrorMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    if (userId) {
      const userRole = role === "user" ? "/home" : "/dashboard";
      navigate(userRole);
    }
  });

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div className="w-[350px] relative m-auto sm:mx-auto sm:w-full sm:max-w-lg px-8 py-10 mt-6 overflow-hidden bg-white p-4 rounded-lg shadow-md">
        {loader && (
          <div className="absolute left-[50%] top-[50%] z-20 flex items-center justify-center ">
            <Loading />
          </div>
        )}
        <h2 className="text-center mb-5 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in your account
        </h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                name="email"
                type="text"
                placeholder="Email"
                autoComplete="off"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                className={`block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  emailError || errorMessage ? "border-red-600" : "" // Apply border-red-600 class when there's an error
                }`}
              />
            </div>
            {/* <div className="h-4"> error message */}
            {emailError && (
              <div className="text-red-600 text-sm">{emailError}</div>
            )}
            {/* </div> */}
          </div>

          <div>
            <div className="mt-[-10px] flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <div className="relative flex items-center">
                {" "}
                <input
                  name="password"
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  className={`block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    passwordError || errorMessage ? "border-red-600" : "" // Apply border-red-600 class when there's an error
                  }`}
                />
                <div
                  onClick={handleTogglePassword}
                  className="cursor-pointer absolute right-3 text-[#243e63] text-xl"
                >
                  {showPassword ? <LuEye /> : <LuEyeOff />}
                </div>
              </div>

              {passwordError && (
                <div className="text-red-600 text-sm">{passwordError}</div>
              )}
              {errorMessage && (
                <div className="text-red-600 text-sm">{errorMessage}</div>
              )}
              <div className="text-sm text-right mt-2">
                <Link
                  to="/change-password"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loader ? true : false}
              className={` ${
                loader ? "cursor-not-allowed" : "cursor-pointer"
              } flex w-full justify-center rounded-md bg-gradient-to-r from-[#f87a58] via-[#f7426f] to-[#f87a58]
             px-3 py-2 text-md font-semibold leading-6 text-white 
             hover:from-[#f7426f] hover:to-[#f7426f] hover:via-[#f87a58] `}
            >
              Log in
            </button>
          </div>
        </form>

        <div className="mt-4 text-gray-600">
          Don&apos;t have an account?{" "}
          <span>
            <Link to="/register" className="text-[#6415ff] hover:underline">
              Register
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
