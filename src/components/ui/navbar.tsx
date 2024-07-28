import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
export default function NavbarComponent() {
  return (
    <div className="w-full flex justify-center items-center">
      <nav className="w-[340px] h-14 bg-zinc-200 opacity-90 backdrop-blur-lg rounded-full flex justify-center items-center fixed bottom-3 z-50">
        <ul className="w-full flex justify-around">
          <Button className="bg-transparent">
            <Link to="/">
              <li>Feed</li>
            </Link>
          </Button>
          <Button className="bg-transparent">
            <Link to="/chat">
              <li>Chat</li>
            </Link>
          </Button>
          <Button className="bg-transparent">
            <Link to="/account">
              <li>Account</li>
            </Link>
          </Button>
        </ul>
      </nav>
    </div>
  );
}
