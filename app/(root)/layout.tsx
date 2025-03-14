import Navbar from "@/app/compnents/Navbar";

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <main className="font-sans text-xl">
            <Navbar/>
            {children}
        </main>
    )
}