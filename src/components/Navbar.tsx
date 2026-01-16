import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";

export default function Navbar() {
    const router = useRouter();
    const { data: session } = useSession();
    return (<div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">🍽️</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Food Review Pro
                    </h1>
                </div>

                <div className="flex items-center gap-4">


                    {/* Profile Section */}
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-gray-900">
                                {session ? session.user?.name : "Guest User"}
                            </p>
                            {/* <p className="text-xs text-gray-600">
                    {reviews.length} reviews
                  </p> */}
                        </div>



                        <div
                            onClick={() => {
                                console.log("Session in Navbar:", session);
                                if (session) {
                                    signOut({ callbackUrl: "/logout" });
                                } else {
                                    signIn("google", { callbackUrl: "/login" });
                                }
                            }}
                        >
                            <img
                                src={session?.user?.image || ""}
                                alt="User"
                                className="w-10 h-10 rounded-full cursor-pointer"
                            />
                        </div>

                    </div>
                </div>
            </div>

            <p className="text-gray-600">
                Discover and review your favorite restaurants
            </p>
        </div>
    </div>)
}