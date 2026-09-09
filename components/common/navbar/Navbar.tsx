import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { Suspense } from "react";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-5/6 mx-auto z-50 border-1 border-slate-600 bg-sky-950/90 backdrop-blur-sm transition-all duration-300 ease-in-out">
      <div className="mx-auto flex items-center justify-between max-w-7xl px-4 py-1 text-white">
        <Link href={"/"}>
          <div>Filmsbook</div>
        </Link>
        <Suspense fallback={<div className="h-9" />}>
          <NavbarLinks />
        </Suspense>
      </div>
    </header>
  );
};
