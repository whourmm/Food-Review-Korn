"use client";

import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCalendar } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navClass = (active: boolean) =>
    `w-10 h-10 flex items-center justify-center rounded-full text-xl font-medium transition
     ${active ? "bg-green-500" : "bg-white"}
     hover:bg-green-300`;

  const iconColor = (active: boolean) =>
    active ? "#ffffff" : "#199f48";

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Eat with Korn!
          </h1>

          <div className="flex items-center gap-6">
            {/* Navigation */}
            <nav className="flex space-x-4">
              <a href="/" className={navClass(isActive("/"))}>
                <FontAwesomeIcon
                  icon={faUtensils}
                  style={{ color: iconColor(isActive("/")) }}
                />
              </a>

              <a href="/calendar" className={navClass(isActive("/calendar"))}>
                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{ color: iconColor(isActive("/calendar")) }}
                />
              </a>
            </nav>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {session ? session.user?.name : "Guest User"}
                </p>
              </div>

              <img
                src={session?.user?.image || "/default-profile.png"}
                alt="User"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() =>
                  session
                    ? signOut({ callbackUrl: "/logout" })
                    : signIn("google", { callbackUrl: "/login" })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
