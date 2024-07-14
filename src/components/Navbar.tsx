import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <Button variant="ghost" className="absolute top-4 left-4">
      <ChevronLeftIcon />
      <Link href="/">พ้มไม่เบื่อโลกแล้วว่ะ</Link>
    </Button>
  );
};

export default Navbar;
