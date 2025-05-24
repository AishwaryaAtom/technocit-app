import * as Yup from "yup";
import moment from "moment";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .required("User name is required")
    .min(3, "User name must be at least 3 characters"),

  email: Yup.string()
    .matches(emailRegex, "Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain upper/lowercase letters, number, and special character"
    ),

  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^\d{10,12}$/, "Invalid Mobile number"),

  role: Yup.string().required("Role is required"),

  dob: Yup.date()
    .required("Date of Birth is required")
    .test(
      "age",
      "You must be at least 16 years old",
      (value) => moment().diff(moment(value), "years") >= 16
    ),

  sportID: Yup.string().required("Sport is required"),

  machineId: Yup.string().required("Machine ID is required"),

  yearsOfExp: Yup.number()
    .required("Years of experience is required")
    .typeError("Years of experience must be a number")
    .min(0, "Experience can't be negative")
    .max(50, "Too much experience"),
});
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, "Invalid email format")
    .required("Email is required"),
  // password: Yup.string().required("Password is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password contains least 6 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password not in correct format, please check"
    ),
});
