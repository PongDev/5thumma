import { Button, buttonVariants } from "./ui/button"

const Navbar = () => {
  return (
    <div className="flex p-6">
      <Button variant={"outline"} className="text-indigo-500">{"< Back To Home"}</Button>
    </div>
  )
}

export default Navbar