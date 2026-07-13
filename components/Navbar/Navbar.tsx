"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 10) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky w-5/6 mx-auto z-50 border-1 border-slate-200 bg-sky-950/90 backdrop-blur-sm transition-all duration-300 ease-in-out
        ${isScrolled ? "top-4 rounded-4xl" : "top-0 rounded-b-4xl border-t-0"}
      `}
    >
      <div className="mx-auto flex items-center justify-between max-w-7xl px-4 py-1 text-white">
        <Link href={"/"}>
          <div>Filmsbook</div>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href={"/login"} />}
                className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-all outline-none hover:bg-indigo-500 focus:bg-sky-950/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50"
              >
                Login
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href={"/signup"} />}
                className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-all outline-none hover:bg-indigo-500 focus:bg-sky-950/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50"
              >
                Sign-Up
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href={"/profile"} />}
                className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-all outline-none hover:bg-indigo-500 focus:bg-sky-950/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50"
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
