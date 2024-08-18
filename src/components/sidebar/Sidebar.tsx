import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./SidebarItem";
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorking,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogOutButton } from "./LogOutButton";

const menuItem = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <IoCalendarOutline />,
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: <IoPersonOutline />,
  },
  {
    title: "Rest TODOS",
    path: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline />,
  },
  {
    title: "Server actions",
    path: "/dashboard/server-todos",
    icon: <IoListOutline />,
  },
  {
    title: "Cookies",
    path: "/dashboard/cookies",
    icon: <IoCodeWorking />,
  },
  {
    title: "Products",
    path: "/dashboard/products",
    icon: <IoBasketOutline />,
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              width={100}
              height={100}
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              alt="tailus logo"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            width={100}
            height={100}
            src={
              session?.user?.image ??
              "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
            }
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {session?.user?.name ?? "Cynthia J. Watts"}
          </h5>
          <span className="hidden text-gray-400 lg:block">
            {session?.user?.roles?.join(", ") ?? ["client"]}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItem.length > 0 &&
            menuItem.map((item) => <SidebarItem key={item.path} {...item} />)}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogOutButton />
      </div>
    </aside>
  );
};
