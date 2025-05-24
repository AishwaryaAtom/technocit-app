import axios from "axios";

export const registerUser = async (values) => {
  const payload = {
    name: values.name,
    email: values.email,
    password: values.password,
    role: values.role,
    mobile: values.mobile,
    dob: new Date(values.dob).toISOString(),
    sportID: parseInt(values.sportID),
    machineId: values.machineId,
    yearsOfExp: parseInt(values.yearsOfExp),
  };

  try {
    const response = await axios.post("/api/Auth/Register", payload);
    return response.data;
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      const message =
        typeof data === "string"
          ? data
          : data.message || "Registration failed.";
      throw new Error(message);
    } else if (error.request) {
      throw new Error("No response from server. Please check your network.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const LoginUser = async (values) => {
  const payload = {
    email: values.email,
    password: values.password,
  };

  try {
    const response = await axios.post("/api/Auth/Authentication", payload);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 500) {
        throw new Error("Internal Server Error. Please try again later.");
      }
      // Get plain text message if it's not a JSON object
      const data = error.response.data;
      const message =
        typeof data === "string" ? data : data.message || "Login failed.";
      throw new Error(message); // Throw with plain string if needed
    } else if (error.request) {
      throw new Error("No response from server. Please check your network.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
export const getAllSports = async () => {
  const response = await axios.get("/api/Sport/GetAllSports");
  return response.data;
};
