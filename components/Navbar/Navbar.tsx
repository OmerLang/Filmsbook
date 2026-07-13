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
      className={`fixed left-1/2 -translate-x-1/2 z-50 border-slate-200 bg-purple-800/80 backdrop-blur-md transition-all duration-300 ease-in-out
      ${isScrolled ? "top-4 w-5/6 rounded-4xl" : "top-0 w-full"}
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
