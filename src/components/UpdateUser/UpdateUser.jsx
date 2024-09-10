"use client";

import { CiUser, CiMail, CiLocationOn, CiPhone } from "react-icons/ci";
import { IoSchoolOutline, IoCloseCircle } from "react-icons/io5";
import { BsGenderTrans } from "react-icons/bs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { updateUser } from "src/libs/data";
import useUserStore from "src/libs/storeUser";

const UpdateUser = ({ user, isOpen, setIsOpen }) => {
  const router = useRouter();

  const { users, inUpdateUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: user.username || "",
      gender: user.gender || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      university: user.university || "",
      address: user.address.address || "",
      phone: user.phone || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        address: {
          address: data.address,
        },
      };
      const newUpdatedUser = await updateUser({ id: user.id, ...updatedData });
      // setUsers(users.map((u) => (u.id === newUpdatedUser.id ? newUpdatedUser : u))); // jika hanya menggunakan setUsers di useUserStore
      inUpdateUser(newUpdatedUser);
      toast.success("User updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user!");
    }
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
    router.refresh();
  };

  return (
    <div data-testid="update-modal" className="bg-n-8/40 backdrop-blur absolute inset-0 flex items-center justify-center">
      <form role="form" onSubmit={handleSubmit(onSubmit)} className="relative dark:bg-n-7 bg-white flex flex-col gap-10 w-[40%] p-6 border border-n-1/10 rounded-md">
        <div>
          <h1 data-testid="update-user" className="text-2xl font-semibold">
            Update <span className="text-logo">User</span>
          </h1>
        </div>

        <div className="bg-ambr-500 flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm text-n-3">Username</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input type="text" {...register("username")} placeholder="Username" className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none placeholder:text-xs placeholder:text-n-4/60 text-xs" />
              <CiUser size={35} className="pe-3 text-n-4/60" />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm text-n-3">Gender</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input type="text" {...register("gender")} placeholder="Gender" className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none placeholder:text-xs placeholder:text-n-4/60 text-xs" />
              <BsGenderTrans size={33} className="pe-3 text-n-4/60" />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm text-n-3">First Name</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input type="text" {...register("firstName")} placeholder="First Name" className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none placeholder:text-xs placeholder:text-n-4/60 text-xs" />
              <CiUser size={33} className="pe-3 text-n-4/60" />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm text-n-3">Last Name</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input type="text" {...register("lastName")} placeholder="Last Name" className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none placeholder:text-xs placeholder:text-n-4/60 text-xs" />
              <CiUser size={33} className="pe-3 text-n-4/60" />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm text-n-3">Email</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input type="text" {...register("email")} placeholder="Email" className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none placeholder:text-xs placeholder:text-n-4/60 text-xs" />
              <CiMail size={35} className="pe-3 text-n-4/60" />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm text-n-3">University</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input type="text" {...register("university")} placeholder="Place your grow up..." className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none placeholder:text-xs placeholder:text-n-4/60 text-xs" />
              <IoSchoolOutline size={35} className="pe-3 text-n-4/60" />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm text-n-3">Address</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input type="text" {...register("address")} placeholder="Jl..." className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none placeholder:text-xs placeholder:text-n-4/60 text-xs" />
              <CiLocationOn size={35} className="pe-3 text-n-4/60" />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm text-n-3">Phone</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input type="text" {...register("phone")} placeholder="phone" className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none placeholder:text-xs placeholder:text-n-4/60 text-xs" />
              <CiPhone size={35} className="pe-3 text-n-4/60" />
            </div>
          </div>

          <button disabled={isSubmitting} type="submit" className="p-2 rounded-md bg-logo text-n-1 w-full">
            {isSubmitting ? "Updating..." : "Update"}
          </button>

          <IoCloseCircle data-testid="close-button" size={30} className="absolute -top-[0.4rem] -right-[0.3rem] text-logo cursor-pointer" onClick={handleClose} />
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
