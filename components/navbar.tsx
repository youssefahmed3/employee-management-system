"use client";
import React, { Children } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";
import { signOut, useSession } from "next-auth/react";

function NavBar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <nav className="bg-customColors-github-dark text-customColors-github-white flex  items-center p-3 justify-end">
      
      <div className="flex gap-6">
        <ul className="flex justify-between items-center gap-6">
          <NavLink href={"/user_info"}>User Information</NavLink>
          <NavLink href={"/employees"}>Employees History</NavLink>
          {session ? (
            <>
              {/* <NavLink href={"/Guest"}>geust view</NavLink> */}
              <div className="hover:bg-customColors-github-white hover:text-customColors-github-dark p-2 rounded-md cursor-pointer bg-red-700" onClick={() => signOut()}>Logout</div>
            </>
          ) : (
            <>
              <NavLink href={"/login"}>Login</NavLink>
              <NavLink href={"/register"}>Register</NavLink>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  // Ensure pathname is a string before calling replace
  const pathname = usePathname().toString().replace(/\/$/, ""); // Normalize by removing trailing slash

  // Ensure props.href is a string before calling replace
  const href = props.href.toString().replace(/\/$/, ""); // Normalize props.href by removing trailing slash

  return (
    <Link
      {...props}
      className={cn(
        "p-2 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground rounded-md transition-colors duration-200",
        pathname.startsWith(href) && "bg-background text-foreground" // Check if pathname starts with href
      )}
    />
  );
}
