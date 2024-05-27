import Link from "next/link";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { ModeToggle } from "./toggle";
import { SunIcon } from "lucide-react";

function Header() {
  return (
    <header className="flex h-16 items-center justify-between px-4 md:px-6 border-o border-b">
      <Link className="flex items-center gap-2" href="#">
        <h2>CEPTOR CLUB</h2>
        <span className="sr-only">CEPTOR CLUB</span>
      </Link>
      <div className="flex items-center gap-4">
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
