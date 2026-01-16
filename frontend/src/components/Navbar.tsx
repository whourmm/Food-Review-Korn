import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();
    return (<div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center justify-between ">
                <div className="flex flex-row gap-10 items-end">
                    
                    <h1 className=" text-3xl font-bold text-gray-900">
                        Eat with Korn!
                    </h1>
                
                   
                </div>
                <div className=""></div>

                <div className="flex items-center gap-4">


                    {/* Profile Section */}
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-gray-900">
                                {session ? session.user?.name : "Guest User"}
                            </p>
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
                                src={session?.user?.image || "https://www.veryicon.com/icons/miscellaneous/youyinzhibo/guest.html"}
                                alt="User"
                                className="w-10 h-10 rounded-full cursor-pointer"
                            />
                        </div>

                    </div>
                </div>
            </div>

           
        </div>
    </div>)
}