"use client";

import Image from "next/image";
import { useEffect } from "react";
import useAuthStore from "src/libs/storeAuth";

const UserInformation = ({ user }) => {
  const { setAuth, currentUser } = useAuthStore();

  useEffect(() => {
    if (user && user.id !== currentUser.id) {
      setAuth(user);
    }
  }, [user, currentUser, setAuth]);

  console.log({ user, currentUser }, "<-----diuserinformation");

  return (
    <div className="bg-tal-500 dark:text-neutral-200 text-n-5 h-24 flex items-center justify-start">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="dark:bg-n-7 bg-neutral-50 p-[6px] border dark:border-n-1/10 border-n-2 rounded-full flex items-center justify-center">
          <Image src={user.image || "/noAvatar.png"} alt="Profile" width={32} height={32} className="rounded-full object-cover w-8 h-w-8" />
        </div>
        {/* User Information */}
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h1>
          <span className="text-xs dark:text-n-3 text-n-4">{user.company.title}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
