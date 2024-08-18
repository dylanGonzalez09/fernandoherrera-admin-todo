"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession();

  return (
    <div>
      <h1>Profile page</h1>
      <hr />
      <div className="flex flex-col">
        <span>{session?.user?.name ?? "No  name"}</span>
        <span>{session?.user?.email ?? "No  email"}</span>
        <span>{session?.user?.image ?? "No  image"}</span>
        <span>{session?.user?.id ?? "No  uuid"}</span>
        <span>{session?.user?.roles?.join(", ") ?? ["No  roles"]}</span>
      </div>
    </div>
  );
};

export default page;
