"use client";
import { useSession } from "next-auth/react";
import React from "react";

function Page() {
  const { data: session } = useSession();
  console.log(session);

  const formatCreatedAt = (dateString: any) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  
  return (
    <div>
      {session ? (
        <div className="flex justify-center flex-col gap-2">
          <p className="text-center text-2xl">
            Welcome,{" "}
            <span className="font-bold font-mono">
              {session.user?.username}
            </span>
          </p>
          <hr className="border-2 border-customColors-github-dark" />
          <p className="text-center text-2xl">
            Your Email,{" "}
            <span className="font-bold font-mono">{session.user?.email}</span>
          </p>
          <p className="text-center text-2xl">
            Your Provider,{" "}
            <span className="font-bold font-mono">
              {session.user?.provider}
            </span>
          </p>
          <p className="text-center text-2xl">
            Joined At :{" "}
            <span className="font-bold font-mono">
              {formatCreatedAt(session.user?.createdAt)}
            </span>
          </p>
        </div>
      ) : (
        <p className="font-bold font-mono text-center text-2xl">
          You need To be Logged in to See This Page
        </p>
      )}
    </div>
  );
}

export default Page;
