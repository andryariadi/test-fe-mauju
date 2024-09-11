"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiUser } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { z } from "zod";
import Cookie from "js-cookie";
// import useSignup from "src/hooks/useSignup";
import { auth } from "src/libs/data";
import useAuthStore from "src/libs/storeAuth";
import toast from "react-hot-toast";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
});

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuthStore();

  // const { signupForm } = useSignup();

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

  // First away
  const onSubmit = async (data) => {
    try {
      const user = await auth(data);
      setAuth(user);
      router.push("/");
      toast.success("Login successful!");
    } catch (error) {
      console.log(error);
      toast.error("Login failed!");
    }
  };

  // Second away
  // const handleSubmitSignup = async (data) => {
  //   await signupForm(data);
  //   router.push("/");
  // };

  return (
    <section className="px-4 py-6 md:px-8 lg:px-16 xl:px-32 2xl:px-64 h-full flex flex-col md:flex-row md:justify-center md:items-center">
      {/* Form Container */}
      <div className="dark:bg-n-7 bg-white shadow-md w-full md:w-1/2 max-h-[60%] md:min-h-[35%] lg:min-h-[85%] xl:min-h-[70%] 2xl:min-h-[75%] border border-n-1/10 rounded-xl flex flex-col justify-between overflow-hidden">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-7 md:gap-10 w-full">
          <div>
            <h1 className="text-2xl font-semibold">
              Sign Up to <span className="text-logo">iProc</span>
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
              <div className="flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
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
            {isSubmitting ? "Signing..." : "Sign Up"}
          </button>
        </form>

        {/* Has Account */}
        <div className="dark:bg-n-8 bg-white py-4 flex items-center justify-center">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-logo">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="relative w-full md:w-1/2 min-h-[40%] md:h-[65%] md:ml-3">
        <Image src="/signup.svg" alt="Login" fill className="object-contain lg:object-cover" />
      </div>
    </section>
  );
};

export default SignupPage;
