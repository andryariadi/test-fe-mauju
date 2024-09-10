import { getUsersById } from "src/libs/data";
import Image from "next/image";
import { HiUser } from "react-icons/hi2";
import { TbGenderTransgender } from "react-icons/tb";
import { FaCalendarDays } from "react-icons/fa6";
import { HiPhone, HiUserGroup } from "react-icons/hi2";
import { IoSchoolSharp, IoLocation } from "react-icons/io5";
import { PiBagFill } from "react-icons/pi";
import { MdBloodtype } from "react-icons/md";

const DetailUser = async ({ params }) => {
  const { id } = params;

  const user = await getUsersById(id);

  return (
    <>
      <div className="b-amber-500 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 h-screen flex items-center justify-center">
        <div className="dark:bg-n-7 bg-white shadow-md  border border-n-1/10 w-full rounded-md flex items-center gap-5 p-3">
          {/* Right */}
          <div className="b-sky-500 w-[30%] flex flex-col items-center justify-center gap-3 border-e-2 dark:border-n-1/10 border-neutral-200">
            <div className="bg-n-8 border-2 border-n-1/10 rounded-full">
              <Image
                src={user.image || "/noAvatar.png"}
                alt="Profile"
                width={160}
                height={160}
                className="w-40 h-40 rounded-full
             object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-medium capitalize">{user.username}</h1>
              <span className="text-sm text-n-3">{user.company.title}</span>
            </div>
          </div>

          {/* Left */}
          <div className="b-teal-500 w-[70%] h-[30%] flex flex-wrap items-center justify-between gap-x-5 gap-y-10 capitalize">
            <div className="b-amber-500 w-[30%] flex items-center gap-2 hover:text-logo transition-all duration-300">
              <HiUser size={24} />
              <span>
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div className="b-amber-500 w-[30%] flex items-center gap-2 hover:text-logo transition-all duration-300">
              <TbGenderTransgender size={24} />
              <span>{user.gender}</span>
            </div>
            <div className="b-amber-500 w-[30%] flex items-center gap-2 hover:text-logo transition-all duration-300">
              <MdBloodtype size={24} />
              <span>{user.bloodGroup}</span>
            </div>
            <div className="b-amber-500 w-[30%] flex items-center gap-2 hover:text-logo transition-all duration-300">
              <FaCalendarDays size={24} />
              <span>{user.birthDate}</span>
            </div>
            <div className="b-amber-500 w-[30%] flex items-center gap-2 hover:text-logo transition-all duration-300">
              <HiPhone size={24} />
              <span>{user.phone}</span>
            </div>
            <div className="b-amber-500 w-[30%] flex items-center gap-2 hover:text-logo transition-all duration-300">
              <HiUserGroup size={24} />
              <span>{user.role}</span>
            </div>
            <div className="b-amber-500 w-[30%] flex items-center gap-2 hover:text-logo transition-all duration-300">
              <PiBagFill size={24} />
              <span>{user.company.department}</span>
            </div>
            <div className="b-amber-500 w-[30%] flex items-center gap-2 hover:text-logo transition-all duration-300">
              <IoLocation size={24} />
              <span>{user.address.state}</span>
            </div>
            <div className="b-amber-500 w-[30%] flex items-center gap-2 hover:text-logo transition-all duration-300">
              <IoSchoolSharp size={24} />
              <span>{user.university}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailUser;
