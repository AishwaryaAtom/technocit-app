import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { LoginUser } from "../api/authApi";
import { loginSchema } from "../utils/ValidationSchema";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: LoginUser,
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success(`Welcome ${data.name} `);
      navigate("/home");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong. Try again later"); // Will now show "User Not Found"
    },
  });
  return (
    <div className="flex justify-center items-center bg-gray-100 py-12 px-4 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden w-full max-w-4xl">
        {/* Left Side: Login Form */}
        <div className="p-10 flex flex-col justify-center w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            LOGIN
          </h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              mutation.mutate(values);
            }}
          >
            {() => (
              <Form className="space-y-4">
                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <div className="w-full border border-gray-300 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-red-400 flex items-center relative">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="flex-1 focus:outline-none"
                    />
                    <span
                      className="ml-2 text-xl text-gray-600 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </span>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={mutation.isLoading}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition"
                >
                  {mutation.isLoading ? "Logging in..." : "Login"}
                </button>
                <p className="text-center text-sm text-gray-600 mt-3">
                  Don’t have an account?
                  <span
                    onClick={() => navigate("/register")}
                    className="text-red-500 font-medium cursor-pointer ml-1"
                  >
                    Register
                  </span>
                </p>
              </Form>
            )}
          </Formik>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/img/real.png"
            alt="Sports"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
