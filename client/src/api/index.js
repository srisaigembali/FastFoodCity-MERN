import axios from "axios";

export const baseURL =
  "http://127.0.0.1:5001/food-delivery-app-8c5d2/us-central1/app";

export const validateJWTToken = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/user/jwtverification`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data;
  } catch (error) {
    return null;
  }
};
