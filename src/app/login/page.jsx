"use client";

import { login } from "src/libs/data";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CiUser } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { z } from "zod";
import Cookie from "js-cookie";
import useAuthStore from "src/libs/storeAuth";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
});

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const user = await login(data);
      setAuth(user);
      router.push("/");
      toast.success("Login successful!");
    } catch (error) {
      console.log(error);
      toast.error("Login failed!");
    }
  };

  return (
    <>
      <section className="bg-ros-500 bg-slat-200 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 h-screen flex items-center justify-center">
        {/* Image */}
        <div className="bg-tal-500 relative w-1/2 h-[65%]">
          <Image src="/login.svg" alt="Login" fill className="object-contain lg:object-cover" />
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="dark:bg-n-7bg-white shadow-md flex flex-col gap-10 w-1/2 p-6 border border-n-1/10 rounded-md">
          <div>
            <h1 className="text-2xl font-semibold">
              Masuk ke Platfrom <span className="text-logo">iProc</span>
            </h1>
            <span className="text-xs text-n-3">Sistem pengadaan barang dan jasa elektronik</span>
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="username" className="text-sm text-n-3">
              Username
            </label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-100 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input
                type="text"
                id="username"
                name="username"
                {...register("username")}
                placeholder="Username"
                className="w-full p-4 rounded-s-lg dark:bg-n-7 bg-neutral-100 outline-none placeholder:text-xs placeholder:text-n-4/60 text-xs"
              />
              <CiUser size={35} className="pe-3 text-n-4/60" />
            </div>
            {errors.username && <span className="text-rose-500 text-xs absolute -bottom-5">{errors.username.message}</span>}
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="password" className="text-sm text-n-3">
              Password
            </label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-100 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                {...register("password")}
                placeholder="Enter your password"
                className="w-full p-4 rounded-lg dark:bg-n-7 bg-neutral-100 outline-none placeholder:text-xs placeholder:text-n-4/60 text-xs"
              />
              <div className="bg-ros-500 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {!showPassword ? (
                  <button type="button">
                    <IoEyeOutline size={35} className="pe-3 text-n-4/60" />
                  </button>
                ) : (
                  <button type="button">
                    <IoEyeOffOutline size={35} className="pe-3 text-n-4/60" />
                  </button>
                )}
              </div>
            </div>
            {errors.password && <span className="text-rose-500 text-xs absolute -bottom-5">{errors.password.message}</span>}
          </div>

          <button disabled={isSubmitting} type="submit" className="p-3 rounded-md bg-logo text-n-1 w-full">
            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </form>
      </section>
    </>
  );
};

export default LoginPage;
