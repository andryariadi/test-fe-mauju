import { cookies } from "next/headers";
import AddUser from "src/components/AddUser/AddUser";
import Header from "src/components/Header";
import MenuSidebar from "src/components/MenuSidebar";
import TableUser from "src/components/TableUser/TableUser";
import UserInformation from "src/components/UserInformation";
import { getAuth } from "src/libs/data";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  let user = null;

  try {
    user = await getAuth(token);
  } catch (error) {
    console.log(error.message);
  }

  console.log({ user, token }, "<---dihomepage");

  return (
    <>
      <section className="bg-ambr-500 flex gap-5 h-screen p-5">
        <aside className="dark:bg-n-7 bg-white dark:border dark:border-n-1/10 w-[20%] p-5 rounded-md flex flex-col gap-5">
          {/* Top */}
          <div className="border-b dark:border-n-1/10 border-n-2/50">
            <UserInformation user={user} />
          </div>
          {/* Bottom */}
          <MenuSidebar />
        </aside>
        <main className="dark:bg-n-7 bg-white dark:border dark:border-n-1/10 w-[80%] p-5 rounded-md flex flex-col gap-5">
          <Header />
          <div className="flex flex-col gap-3">
            <AddUser />
            <TableUser />
          </div>
        </main>
      </section>
    </>
  );
}
