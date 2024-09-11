"use client";

import { Suspense, useEffect } from "react";
import TrTbody from "../TrBody/TrTbody";
import Loading from "../Loader";
import { useQuery } from "react-query";
import useUserStore from "src/libs/storeUser";
import useSearchStore from "src/libs/storeSearch";
import useSortStore from "src/libs/storeSort";
import { getUsers, searchUsers, sortUsers } from "src/libs/data";

const TableUser = ({ user }) => {
  const { setUsers, users } = useUserStore();
  const { query } = useSearchStore();
  const { input } = useSortStore();

  const { data, error, isLoading, refetch } = useQuery(
    ["users", query, input],
    async () => {
      if (query) {
        const searchData = await searchUsers(query);
        return searchData;
      } else if (input.sort && input.order) {
        const sortedData = await sortUsers(input);
        return sortedData;
      } else {
        const allUsers = await getUsers();
        return allUsers;
      }
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => setUsers(data),
    }
  );

  // console.log(users, "<---diditable");

  useEffect(() => {
    if (query || (input.sort && input.order)) {
      refetch();
    }
  }, [query, input, refetch]);

  if (isLoading) return <Loading />;

  if (error) return <span className="text-red-500">Error: {error.message}</span>;

  return (
    <section className="tableContainer px-5 dark:bg-n-8 bg-neutral-100 border border-n-1/10 rounded-md w-full lg:w-[100%] overflow-x-hidden max-h-[32rem] md:max-h-[43rem] lg:max-h-[25rem] xl:max-h-[33rem] 2xl:max-h-[30.5rem]">
      <table className="bg-tal-600 table-auto w-full dark:text-neutral-200 text-n-5">
        <thead className="dark:bg-n-7 bg-white text-base border-b dark:border-n-1/10 border-n-2/50 sticky top-0">
          <tr className="b-sky-700">
            <th className="b-violet-500 text-start py-4 lg:w-[15%] 2xl:w-[10%]">Username</th>
            <th className="b-sky-500 text-start py-4 lg:w-[15%] 2xl:w-[10%]">Gender</th>
            <th className="hidden lg:table-cell b-teal-500 text-start py-4 lg:w-[27%] 2xl:w-[20%]">Phone</th>
            <th className="hidden lg:table-cell b-gray-500 text-start py-4 lg:w-[27%] 2xl:w-[25%]">Address</th>
            <th className="hidden 2xl:table-cell b-violet-500 text-start py-4 2xl:w-[10%]">Email</th>
            <th className="b-sky-500 text-start py-4 lg:w-[16%] 2xl:w-[10%]">Action</th>
          </tr>
        </thead>

        <tbody className="b-amber-500 text-md font-mono">
          <Suspense fallback={<Loading />}>
            <TrTbody user={user} />
          </Suspense>
        </tbody>
      </table>
    </section>
  );
};

export default TableUser;
