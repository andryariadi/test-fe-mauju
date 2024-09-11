import axios from "axios";
import toast from "react-hot-toast";
import useUserStore from "src/libs/storeUser";

const useAddUser = () => {
  const { addUser } = useUserStore();
  const createUserForm = async (data) => {
    try {
      const res = await axios.post("https://dummyjson.com/users/add", data);

      addUser(res.data);

      if (res.status === 200 || res.status === 201) {
        toast.success("User created successfully!");
        return res.data;
      } else {
        console.error("Error response:", res);
        toast.error("Failed to create user!");
        throw new Error(`Failed to create user! Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error creating user:", error.res ? error.res.data : error.message);
      toast.error("Failed to create user!");
      throw error;
    }
  };

  return { createUserForm };
};

export default useAddUser;
