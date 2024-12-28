import { getAuthSession } from "@/auth";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form method="post" action="/api/auth/signout">
                <input type="hidden" name="callbackUrl" value="/" />
                <button type="submit">Logout</button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form method="post" action="/api/auth/signin/github">
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
