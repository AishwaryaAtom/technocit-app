import axios from "axios";

const BASE_URL = "/api/User";

export const getUsersList = async (token) => {
  const response = await axios.get(`${BASE_URL}/GetUsersList`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserProfile = async (userId, token) => {
  const response = await axios.get(`${BASE_URL}/getuserprofile/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


