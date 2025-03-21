import Link from "next/link";
import Image from "next/image";
import {auth, signIn, signOut} from "@/auth";

const Navbar = async () => {
    const session = await auth();

    return (
        <header className="px-5 py-3 shadow-sm font-sans">
            <nav className="flex items-center justify-between">
                <div className="flex items-center justify-between">
{/*this code for logo, home, retreat, news, about, please slice these components to smaller piece of cake yo ri fair*/}
                    <div>
                        <Link href="/">
                            <Image src="/redwood-logo-white.png" alt="logo_header" width={127} height={96} />
                        </Link>
                    </div>
                    <div className="justify-start">
                        <Link href="/home">
                            <span> Home </span>
                        </Link>
                        <Link href="/retreat">
                            <span> Retreat </span>
                        </Link>
                        <Link href="/news">
                            <span> News </span>
                        </Link>
                        <Link href="/about">
                            <span> About </span>
                        </Link>
                    </div>
                </div>

{/*under this code for button get in touch & join retreat*/}
                <div className="flex items-center justify-end">
                    <div>
                        <button
                            className="bg-transparent hover:bg-white-100 text-white-200 font-medium hover:text-white py-2 px-4 border border-white-200 hover:border-transparent rounded-xl text-sm text-center inline-flex items-center m-3">
                            GET IN TOUCH
                        </button>
                    </div>
                    <div>
                        <button
                            className="group gap-1 bg-transparent hover:bg-white-100 text-white-200 hover:text-white py-2 px-4 border border-white-200 hover:border-transparent rounded-xl font-medium text-sm text-center inline-flex items-center m-3">
                            <span>JOIN RETREAT</span>
                            <svg viewBox="0 0 24 24" className="size-5 stroke-[3px] fill-none stroke-current opacity-50 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <line x1="5" y1="12" x2="19" y2="12" className="scale-x-0 translate-x-[10px] group-hover:translate-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"/>
                                <polyline points="12 5 19 12 12 19" className="-translate-x-2 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"/>
                            </svg>

                        </button>
                    </div>
                    {session && session.user ? ( //check if user already log in?
                        <>
                            <Link href="/startup/create">
                            <span> Create </span>
                        </Link>
                            <form action={async () => {
                                "use server"
                                await signOut({redirectTo: "/"})
                            }}>
                                <button type="submit">
                                    Logout
                                </button>
                            </form>
                            <Link href={`/user/${session?.user?.name}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : ( // this is what happen if user not log in
                        <form action={async () => {
                            "use server";
                            await signIn('google');
                        }}>
                            <button type="submit"
                                    className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 m-3">
                                <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 18 19">
                                    <path fill-rule="evenodd"
                                          d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                                          clip-rule="evenodd"/>
                                </svg>
                                Login
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar;