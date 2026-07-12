import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-5/6 border-slate-200 bg-zinc-300 rounded-4xl">
      <div className="mx-auto flex items-center justify-between max-w-7xl px-4 py-1">
        <Link href={"/"}>
          <div>Filmsbook</div>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href={"/login"} />}
                className={navigationMenuTriggerStyle()}
              >
                Login
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href={"/signup"} />}
                className={navigationMenuTriggerStyle()}
              >
                Sign-Up
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href={"/profile"} />}
                className={navigationMenuTriggerStyle()}
              >
                Profile
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};
