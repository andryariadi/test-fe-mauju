import axios from "axios";
import Cookies from "js-cookie";

export const login = async ({ username, password }) => {
  try {
    const res = await axios.post("https://dummyjson.com/auth/login", {
      username,
      password,
    });

    console.log(res, "<----dilogin");

    if (res.data && res.data.token) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);

      console.log(expiryDate, "<----dilogin");

      Cookies.set("token", res.data.token, {
        expires: expiryDate,
        secure: true,
        sameSite: "strict",
      });

      return res.data;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw new Error("Login failed. Please check your credentials and try again.");
  }
};

export const getAuth = async (token) => {
  try {
    const res = await axios.get("https://dummyjson.com/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to retrieve user data:", error.message);
    throw new Error("Failed to retrieve user data. Please try again later.");
  }
};

export const getUsers = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/users");
    return res.data.users;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersById = async (id) => {
  try {
    const res = await axios.get(`https://dummyjson.com/users/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async ({ username, gender, email, password, address, phone }) => {
  try {
    const res = await axios.post("https://dummyjson.com/users/add", {
      username,
      gender,
      email,
      password,
      address,
      phone,
    });

    if (res.status === 201) {
      return res.data;
    } else {
      throw new Error(`Unexpected response status: ${res.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async ({ id, username, firstName, lastName, gender, email, university, address, phone }) => {
  try {
    const res = await axios.put(`https://dummyjson.com/users/${id}`, {
      username,
      firstName,
      lastName,
      gender,
      email,
      university,
      address,
      phone,
    });

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Unexpected response status: ${res.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`https://dummyjson.com/users/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchUsers = async (query) => {
  try {
    const res = await axios.get(`https://dummyjson.com/users/search?q=${query}`);
    return res.data.users;
  } catch (error) {
    console.log(error);
  }
};

export const sortUsers = async ({ sort, order }) => {
  try {
    const response = await axios.get(`https://dummyjson.com/users`, {
      params: { sortBy: sort, order: order },
    });

    return response.data.users;
  } catch (error) {
    console.error("Error sorting users:", error);
    throw error;
  }
};
