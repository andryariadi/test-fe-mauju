import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import useAuthStore from "src/libs/storeAuth";

const useLogin = () => {
  const { setAuth } = useAuthStore();
  const loginForm = async ({ username, password }) => {
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      console.log(res, "<----diloginhook");

      if (res.status !== 200) {
        throw new Error("Invalid credentials");
      }

      setAuth(res.data);

      toast.success("Login successful!");

      if (res.data && res.data.token) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

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
      console.log(error);
      toast.error(error.message);
    }
  };

  return { loginForm };
};

export default useLogin;
