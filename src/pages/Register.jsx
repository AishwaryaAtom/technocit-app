
import { useState ,useRef} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { registrationSchema } from "../utils/ValidationSchema";
import { toast } from "react-hot-toast";
import { registerUser } from "../api/authApi";
import { getAllSports } from "../api/authApi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./register.css"

const Register = () => {
  const navigate = useNavigate();
  const dateInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong.Try again later")
    },
  });

  const { data: sports, isLoading: sportsLoading } = useQuery({
    queryKey: ["sports"],
    queryFn: getAllSports,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Side: Form */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">WELCOME!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Please enter your details to register.
          </p>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              role: "",
              mobile: "",
              dob: "",
              sportID: "",
              machineId: "",
              yearsOfExp: "",
            }}
            validationSchema={registrationSchema}
            onSubmit={(values, { resetForm }) => {
              mutation.mutate(values, { onSuccess: () => resetForm() });
            }}
          >
            {() => (
              <Form className="space-y-4">
                <div>
                  <Field
                    name="name"
                    type="name"
                    placeholder="User Name"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 leading-relaxed"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 leading-relaxed"
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

                
                {[
                  { name: "role", placeholder: "Role" },
                  {
                    name: "mobile",
                    placeholder: "Mobile Number",
                    type: "text",
                  },
                  { name: "machineId", placeholder: "Machine" },
                  {
                    name: "yearsOfExp",
                    placeholder: "Experience (years)",
                    type: "number",
                  },
                ].map(({ name, placeholder, type }) => (
                  <div
                    key={name}
                    // className={name == "password" ? "relative" : ""}
                  >
                    <Field
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 leading-relaxed"
                    />
                    {name == "password" && (
                      <span
                        className="absolute right-3 top-2/4 transform -translate-y-1/2 text-xl text-gray-600 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible className="eye" />
                        ) : (
                          <AiOutlineEye className="eye" />
                        )}
                      </span>
                    )}
                    <ErrorMessage
                      name={name}
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                ))}

                {/* <div>
                  <Field
                    name="dob"
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-500 bg-white custom-date"
                    placeholder="Date of Birth"
                    title="Click on the calender icon"
                  />
                  <ErrorMessage
                    name="dob"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div> */}
                <div onClick={() => dateInputRef.current?.showPicker()}>
                  <Field
                    innerRef={dateInputRef}
                    name="dob"
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-500 bg-white cursor-pointer"
                    placeholder="Date of Birth"
                    title="Click on the calendar icon"
                  />
                  <ErrorMessage
                    name="dob"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Field
                    as="select"
                    name="sportID"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-500 bg-white appearance-none"
                  >
                    <option value="" disabled>
                      Select Sport
                    </option>
                    {sportsLoading ? (
                      <option>Loading...</option>
                    ) : (
                      sports?.map((sport) => (
                        <option key={sport.id} value={sport.id}>
                          {sport.name}
                        </option>
                      ))
                    )}
                  </Field>
                  <ErrorMessage
                    name="sportID"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={mutation.isLoading}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition"
                >
                  {mutation.isLoading ? "Registering..." : "Register"}
                </button>

                <p className="text-center text-sm text-gray-600 mt-3">
                  Already a user? Please
                  <span
                    onClick={() => navigate("/login")}
                    className="text-red-500 font-medium cursor-pointer"
                  >
                    {" "}
                    Login
                  </span>{" "}
                </p>
              </Form>
            )}
          </Formik>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:block bg-gray-100">
          <img
            src="/img/sports.svg"
            alt="Sports"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
