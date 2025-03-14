import Link from "next/link";
import Image from "next/image";
import {auth, signIn, signOut} from "@/auth";

const Navbar = async () => {
    const session = await auth();
console.log("isine session iki", session);
    return (
        <header className="px-5 py-3 shadow-sm font-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/redwood-logo-white.png" alt="logo_header" width={127} height={96} />
                </Link>
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

                <div className="flex items-center gap-5">
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
                            <button type="submit">
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