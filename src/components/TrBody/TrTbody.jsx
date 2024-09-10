"use client";

import { AiFillDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { HiViewGrid } from "react-icons/hi";
import UpdateUser from "../UpdateUser/UpdateUser";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { deleteUser, getUsersById } from "src/libs/data";
import useUserStore from "src/libs/storeUser";
import useAuthStore from "src/libs/storeAuth";

const TrBody = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const router = useRouter();

  const { users, removeUser } = useUserStore();
  const { currentUser } = useAuthStore();

  useEffect(() => {
    if (users) return;
  }, [users]);

  if (!users) return notFound();

  const handleEditClick = async (id) => {
    if (currentUser?.id !== id) {
      toast.error("You are not allowed to edit this user!");
      return;
    }

    const user = await getUsersById(id);
    setSelectedUser(user);
    setIsOpen(!isOpen);
  };

  const handleDeleteClick = async (id) => {
    if (currentUser?.id !== id) {
      toast.error("You are not allowed to delete this user!");
      return;
    }

    try {
      await deleteUser(id);
      removeUser(id);
      toast.success("User deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user!");
    }
  };

  const handleProfileClick = (id) => {
    if (currentUser?.id !== id) {
      toast.error("You are not allowed to view this profile!");
    } else {
      router.push(`/user/${id}`);
    }
  };

  console.log(currentUser, "<----diTrBody");

  return (
    <>
      {users.map((user) => (
        <tr key={user.id} className="border-b dark:border-n-1/10 border-n-2/50">
          <th className="b-violet-500 text-start py-3 w-[10%] capitalize">{user.username}</th>
          <th className="b-sky-500 text-start py-3 w-[10%] capitalize">{user.gender}</th>
          <th className="b-teal-500 text-start py-3 w-[20%]">{user.phone}</th>
          <th className="b-gray-500 text-start py-3 w-[25%]">{user.address.address}</th>
          <th className="b-amber-500 text-start py-3 w-[25%]">{user.email}</th>
          <th className="b-sky-500 text-start py-3 w-[10%]">
            <div className="flex justify-between">
              <button type="button" onClick={() => handleProfileClick(user.id)}>
                <HiViewGrid size={20} className="cursor-pointer text-teal-500" />
              </button>

              <button type="button" data-testid="edit-button" onClick={() => handleEditClick(user.id)}>
                <MdModeEditOutline size={20} className="cursor-pointer text-logo" />
              </button>

              <button type="button" data-testid="delete-button" onClick={() => handleDeleteClick(user.id)}>
                <AiFillDelete size={20} className="cursor-pointer text-rose-500" />
              </button>
            </div>

            {isOpen && <UpdateUser user={selectedUser} isOpen={isOpen} setIsOpen={setIsOpen} />}
          </th>
        </tr>
      ))}
    </>
  );
};

export default TrBody;
