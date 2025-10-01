import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/public/images/lheritage-logo.png";
import { LogOut, ChevronDown, LockKeyhole } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white">
      <div className="container flex justify-between items-center gap-4 py-6">
        <Link href="/" className="shrink-0">
          <Image src={Logo} alt="L'Héritage 105" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="font-normal cursor-pointer h-auto p-0"
            >
              <Image src="/images/avatar.png" alt="" width={50} height={50} />
              <span className="hidden md:inline-block">
                reservation@lheritage105.com
              </span>
              <ChevronDown className="text-black" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-w-fit">
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="font-normal flex justify-start w-full cursor-pointer"
              >
                <LogOut className="" />
                Se déconnecter
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="text-black font-normal flex justify-start w-full cursor-pointer"
              >
                <LockKeyhole className="text-black" />
                Modifier le mot de passe
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="text-primary-red font-normal flex justify-start w-full cursor-pointer"
              >
                <LogOut className="text-inherit" />
                Supprimer le compte
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
