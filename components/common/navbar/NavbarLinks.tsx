import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { LogoutBtn } from "../ui/LogoutBtn";
export const NavbarLinks = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            render={
              session ? <Link href={"/profile"} /> : <Link href={"/login"} />
            }
            className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-all outline-none hover:bg-indigo-500 focus:bg-sky-950/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50"
          >
            {session ? "Profile" : "Login"}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            render={
              session ? <Link href={"/settings"} /> : <Link href={"/signup"} />
            }
            className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-all outline-none hover:bg-indigo-500 focus:bg-sky-950/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50"
          >
            {session ? "Settings" : "Sign-Up"}
          </NavigationMenuLink>
        </NavigationMenuItem>
        {session && (
          <LogoutBtn size="sm" className="cursor-pointer">
            Logout
          </LogoutBtn>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
